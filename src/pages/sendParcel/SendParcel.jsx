import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm();

  //data
  const serviceCenter = useLoaderData();
  // console.log(information.map((district) => district.district));

  const duplicateRegions = serviceCenter.map((r) => r.region);
  const region = [...new Set(duplicateRegions)]; //return regins array without duplicate

  //watch the live region

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const recevierRegion = useWatch({ control, name: "reciverRegioin" });
  console.log(recevierRegion);
  console.log(senderRegion);

  // const districtregion = (region) => {
  //   const regionDistrict = serviceCenter.filter((c) => c.region === region);
  //   console.log(regionDistrict);
  //   const district = regionDistrict.map((d) => d.district);
  //   const coverArea = regionDistrict.map((a) => a.covered_area);
  //   const area = coverArea.flatMap((r) => r);
  //   console.log(area.map((r) => r));
  //   return { district, coverArea };
  // };
  const districtregion = (region) => {
    const regionDistrict = serviceCenter.filter((r) => r.region === region);
    const district = regionDistrict.map((d) => d.district);
    const coverArea = regionDistrict.map((a) => a.covered_area);
    //   const area = coverArea.flatMap((r) => r);
    return { district, coverArea };
  };
  const { district } = districtregion(senderRegion);
  console.log(district);
  const { district: receviorDistrict } = districtregion(recevierRegion);
  console.log(receviorDistrict);

  const handleSendParcel = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-start text-5xl mt-8 font-extrabold text-[#03373D]">
        Send Parcel
      </h2>

      <h3 className="text-3xl font-extrabold text-[#03373D] my-4">
        Enter your parcel details
      </h3>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* =========================
            PARCEL TYPE
        ========================== */}

        <div className="flex items-start gap-10">
          <label className="flex gap-1 cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("parcelType", {
                required: "Please select parcel type",
              })}
              className="radio radio-neutral"
            />
            Document
          </label>

          <label className="flex gap-1 cursor-pointer">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType", {
                required: "Please select parcel type",
              })}
              className="radio radio-neutral"
            />
            Non-Document
          </label>
        </div>

        {errors.parcelType && (
          <p className="text-red-500 mt-1">{errors.parcelType.message}</p>
        )}

        {/* =========================
            PARCEL INFO
        ========================== */}

        <div className="flex items-center justify-center gap-10">
          {/* Parcel Name */}
          <div className="flex-1">
            <label className="label mt-4 mb-1 text-slate-900 font-medium">
              Parcel Name
            </label>

            <input
              type="text"
              {...register("parcelName", {
                required: "Parcel Name is required",
              })}
              className="input w-full"
              placeholder="Parcel Name"
            />

            {errors.parcelName && (
              <p className="text-red-500">{errors.parcelName.message}</p>
            )}
          </div>

          {/* Parcel Weight */}
          <div className="flex-1">
            <label className="label mt-4 mb-1 text-slate-900 font-medium">
              Parcel Weight
            </label>

            <div className="join w-full">
              <input
                type="number"
                step="0.01"
                {...register("parcelWeight", {
                  required: "Parcel Weight is required",
                  min: {
                    value: 0.1,
                    message: "Weight must be greater than 0",
                  },
                })}
                className="input join-item w-full"
                placeholder="Enter weight"
              />

              <span className="btn join-item no-animation cursor-default">
                KG
              </span>
            </div>

            {errors.parcelWeight && (
              <p className="text-red-500">{errors.parcelWeight.message}</p>
            )}
          </div>
        </div>

        {/* =========================
            SENDER & RECEIVER
        ========================== */}

        <div className="flex items-start gap-10">
          {/* =========================
              SENDER DETAILS
          ========================== */}

          <div className="flex-1">
            <h3 className="text-xl font-extrabold my-3 text-[#03373D]">
              Sender Details
            </h3>

            <fieldset>
              {/* Sender Name */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Sender Name
              </label>
              <input
                type="text"
                {...register("senderName", {
                  required: "Sender Name is required",
                })}
                className="input w-full"
                placeholder="Sender Name"
              />
              {errors.senderName && (
                <p className="text-red-500">{errors.senderName.message}</p>
              )}
              {/* Sender Address */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Sender Address
              </label>
              <input
                type="text"
                {...register("senderAddress", {
                  required: "Sender Address is required",
                })}
                className="input w-full"
                placeholder="Sender Address"
              />
              {errors.senderAddress && (
                <p className="text-red-500">{errors.senderAddress.message}</p>
              )}
              {/* Sender Phone */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Sender Phone No
              </label>
              <input
                type="tel"
                {...register("senderPhone", {
                  required: "Sender Phone is required",
                })}
                className="input w-full"
                placeholder="Sender Phone Number"
              />
              {errors.senderPhone && (
                <p className="text-red-500">{errors.senderPhone.message}</p>
              )}
              {/* sender region */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Your Region
              </label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("senderRegion", {
                  required: "Please select your regions",
                })}
              >
                {/* ❌ তোমার আগের code-এ "Pick a color" ছিল।
                    এখানে district-এর জন্য proper placeholder দেওয়া হয়েছে। */}
                {region.map((r) => (
                  <option className="text-black " value={r}>
                    {r}
                  </option>
                ))}
                {/* <option defaultValue={"pick a region"}>
                  pick a regin time is{" "}
                </option> */}
              </select>
              {/* Sender District */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Your District
              </label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("senderDistrict", {
                  required: "Please select your district",
                })}
              >
                {/* ❌ তোমার আগের code-এ "Pick a color" ছিল।
                    এখানে district-এর জন্য proper placeholder দেওয়া হয়েছে। */}
                {district.map((district) => (
                  <option value={district}>{district}</option>
                ))}
                {/* <option  defaultValue={"pick a region"}>
                  pick a regin
                </option> */}
              </select>
              {errors.senderDistrict && (
                <p className="text-red-500">{errors.senderDistrict.message}</p>
              )}
              {/* <select
                {...register("coveredArea", {
                  required: "Please select a covered area",
                })}
                className="select w-full"
              >
                <option value="">Select Covered Area</option>

                {coverArea.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select> */}
              {/* {errors.coveredArea && (
                <p className="text-red-500">{errors.coveredArea.message}</p>
              )} */}
              {/* Pickup Instruction */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Pickup Instruction
              </label>
              <textarea
                {...register("pickupInstruction")}
                placeholder="Pickup Instruction"
                className="textarea w-full"
              />
            </fieldset>
          </div>

          {/* =========================
              RECEIVER DETAILS
          ========================== */}

          <div className="flex-1">
            <h3 className="text-xl font-extrabold my-3 text-[#03373D]">
              Receiver Details
            </h3>

            <fieldset>
              {/* Receiver Name */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Receiver Name
              </label>

              <input
                type="text"
                {...register("receiverName", {
                  required: "Receiver Name is required",
                })}
                className="input w-full"
                placeholder="Receiver Name"
              />

              {errors.receiverName && (
                <p className="text-red-500">{errors.receiverName.message}</p>
              )}

              {/* Receiver Address */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Receiver Address
              </label>

              <input
                type="text"
                {...register("receiverAddress", {
                  required: "Receiver Address is required",
                })}
                className="input w-full"
                placeholder="Receiver Address"
              />

              {errors.receiverAddress && (
                <p className="text-red-500">{errors.receiverAddress.message}</p>
              )}

              {/* Receiver Phone */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Receiver Phone No
              </label>

              <input
                type="tel"
                {...register("receiverPhone", {
                  required: "Receiver Phone is required",
                })}
                className="input w-full"
                placeholder="Receiver Phone Number"
              />

              {errors.receiverPhone && (
                <p className="text-red-500">{errors.receiverPhone.message}</p>
              )}

              {/* Recevir region */}
              <lable className="label mt-4 mb-1 text-slate-900 font-medium">
                Recevier Region
              </lable>
              <select
                className="select w-full"
                {...register("reciverRegioin", {
                  required: "Please select reciver regioin",
                })}
              >
                {region.map((r) => (
                  <option>{r}</option>
                ))}
              </select>

              {/* Receiver District */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Receiver District
              </label>

              <select
                defaultValue=""
                className="select w-full"
                {...register("receiverDistrict", {
                  required: "Please select receiver district",
                })}
              >
                {/* {information.map((district) => (
                  <option value={district.district}>{district.district}</option>
                ))} */}
                {receviorDistrict.map((d) => (
                  <option>{d}</option>
                ))}
              </select>

              {errors.receiverDistrict && (
                <p className="text-red-500">
                  {errors.receiverDistrict.message}
                </p>
              )}

              {/* Delivery Instruction */}
              <label className="label mt-4 mb-1 text-slate-900 font-medium">
                Delivery Instruction
              </label>

              <textarea
                {...register("deliveryInstruction")}
                placeholder="Delivery Instruction"
                className="textarea w-full"
              />
            </fieldset>
          </div>
        </div>

        {/* Pickup Time */}
        <p className="my-4">* Pickup Time 4pm-7pm Approx.</p>

        {/* ❌ তোমার এখানে type="submmit" ছিল।
            সঠিক spelling হলো type="submit" */}

        <button
          type="submit"
          className="bg-primary font-bold text-[20px] px-4 lg:px-8 py-2 lg:py-4 rounded-lg mr-2 my-5"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
