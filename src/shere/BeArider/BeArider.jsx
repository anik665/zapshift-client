import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeArider = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const serviceCenter = useLoaderData() || [];
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ১. ইউনিক Region বের করা
  const regions = [...new Set(serviceCenter.map((r) => r.region))];

  // ২. Form Inputs Watch করা
  const selectedRegion = useWatch({ control, name: "senderRegion" });
  const selectedDistrict = useWatch({ control, name: "senderDistrict" });

  // ৩. সিলেক্ট করা Region থেকে Filter করে District তালিকা বের করা
  const availableDistricts = serviceCenter
    .filter((item) => item.region === selectedRegion)
    .map((item) => item.district);

  // ৪. সিলেক্ট করা District থেকে Covered Areas (Thana) বের করা
  const availableAreas = serviceCenter
    .filter((item) => item.district === selectedDistrict)
    .flatMap((item) => item.covered_area);

  // Region বদলালে District এবং Area রিসেট করা
  useEffect(() => {
    setValue("senderDistrict", "");
    setValue("coveredArea", "");
  }, [selectedRegion, setValue]);

  // District বদলালে Area রিসেট করা
  useEffect(() => {
    setValue("coveredArea", "");
  }, [selectedDistrict, setValue]);

  const onSubmit = (data) => {
    console.log("Rider Application Data:", data);
    // axiosSecure দিয়ে API Call করতে পারেন
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl font-extrabold text-secondary">Be a Rider</h1>
      <p className="text-lg text-gray-600 mt-2">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="flex-1 max-w-2xl mt-6">
        <h3 className="text-xl font-extrabold my-3 text-[#03373D]">
          Tell us about yourself
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-4">
            {/* Rider Name */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Rider Name
              </label>
              <input
                defaultValue={user?.displayName || ""}
                type="text"
                {...register("riderName", {
                  required: "Rider Name is required",
                })}
                className="input w-full border rounded p-2"
                placeholder="Rider Name"
              />
              {errors.riderName && (
                <p className="text-red-500 text-sm">
                  {errors.riderName.message}
                </p>
              )}
            </div>
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Driving License Number
              </label>
              <input
                defaultValue={""}
                type="text"
                {...register("drivingLicenseNumber", {
                  required: "Driving License Number is required",
                })}
                className="input w-full border rounded p-2"
                placeholder="Driving License Number"
              />
              {errors.drivingLicenseNumber && (
                <p className="text-red-500 text-sm">
                  {errors.drivingLicenseNumber.message}
                </p>
              )}
            </div>
            //rider NID
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Rider NID
              </label>
              <input
                type="text"
                {...register("riderNID", {
                  required: "Rider NID is required",
                })}
                className="input w-full border rounded p-2"
                placeholder="Rider NID"
              />
              {errors.riderNID && (
                <p className="text-red-500 text-sm">
                  {errors.riderNID.message}
                </p>
              )}
            </div>
            {/* Rider Email */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Rider Email
              </label>
              <input
                defaultValue={user?.email || ""}
                type="email"
                readOnly
                {...register("riderEmail", {
                  required: "Rider Email is required",
                })}
                className="input w-full border rounded p-2 bg-gray-100"
                placeholder="Rider Email"
              />
              {errors.riderEmail && (
                <p className="text-red-500 text-sm">
                  {errors.riderEmail.message}
                </p>
              )}
            </div>
            {/* Rider Address */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Rider Address
              </label>
              <input
                type="text"
                {...register("riderAddress", {
                  required: "Rider Address is required",
                })}
                className="input w-full border rounded p-2"
                placeholder="Rider Address"
              />
              {errors.riderAddress && (
                <p className="text-red-500 text-sm">
                  {errors.riderAddress.message}
                </p>
              )}
            </div>
            {/* Rider Phone */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Rider Phone No
              </label>
              <input
                type="tel"
                {...register("riderPhone", {
                  required: "Rider Phone is required",
                })}
                className="input w-full border rounded p-2"
                placeholder="Rider Phone Number"
              />
              {errors.riderPhone && (
                <p className="text-red-500 text-sm">
                  {errors.riderPhone.message}
                </p>
              )}
            </div>
            {/* Sender Region */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Your Region
              </label>
              <select
                defaultValue=""
                className="select w-full border rounded p-2"
                {...register("senderRegion", {
                  required: "Please select your region",
                })}
              >
                <option value="" disabled>
                  Pick a Region
                </option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <p className="text-red-500 text-sm">
                  {errors.senderRegion.message}
                </p>
              )}
            </div>
            {/* Sender District */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Your District
              </label>
              <select
                defaultValue=""
                disabled={!selectedRegion}
                className="select w-full border rounded p-2 disabled:bg-gray-100"
                {...register("RiderDistrict", {
                  required: "Please select your district",
                })}
              >
                <option value="" disabled>
                  Pick a District
                </option>
                {availableDistricts.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.RiderDistrict && (
                <p className="text-red-500 text-sm">
                  {errors.RiderDistrict.message}
                </p>
              )}
            </div>
            {/* Rider Thana / Covered Area */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Rider Thana / Area
              </label>
              <select
                defaultValue=""
                disabled={!selectedDistrict}
                className="select w-full border rounded p-2 disabled:bg-gray-100"
                {...register("coveredArea", {
                  required: "Please select a covered area",
                })}
              >
                <option value="" disabled>
                  Pick an Area
                </option>
                {availableAreas.map((a, index) => (
                  <option key={index} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              {errors.coveredArea && (
                <p className="text-red-500 text-sm">
                  {errors.coveredArea.message}
                </p>
              )}
            </div>
            {/* Pickup Instruction */}
            <div>
              <label className="label mb-1 text-slate-900 font-medium block">
                Pickup Instruction
              </label>
              <textarea
                {...register("pickupInstruction")}
                placeholder="Pickup Instruction"
                className="textarea w-full border rounded p-2"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-900"
            >
              Submit Application
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default BeArider;
