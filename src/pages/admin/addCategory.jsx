// src/pages/admin/AddCategory.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const navigate = useNavigate();
  const [multiValue, setMultiValue] = useState("");

  // ✅ Validation
  const validationSchema = Yup.object({
    type: Yup.string().required("Category type is required"),
    image: Yup.mixed().nullable(), // image optional
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      image: null,
    },
    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        if (!multiValue.trim()) {
          alert("Please enter at least one value");
          return;
        }

        const items = multiValue
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);

        for (const item of items) {
          const formData = new FormData();
          formData.append("name", item);
          formData.append("type", values.type);
          if (values.image) formData.append("image", values.image);

          await axios.post(
            "http://localhost:5006/api/admin/categories/add",
            formData
          );
        }

        alert("Category added successfully");
        resetForm();
        setMultiValue("");
        navigate("/admin/categories");
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Something went wrong");
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Add Category</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {/* TYPE */}
          <div>
            <label className="block font-medium mb-1">Category Type</label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select type</option>
              <option value="occasion">Occasion</option>
              <option value="flavour">Flavour</option>
              <option value="size">Size</option>
              <option value="color">Color</option>
              <option value="bakeries">Bakeries</option> {/* ✅ Added color */}
            </select>
            {formik.errors.type && (
              <p className="text-red-500 text-sm">{formik.errors.type}</p>
            )}
          </div>

          {/* VALUES */}
          <div>
            <label className="block font-medium mb-1">
              {formik.values.type
                ? `${formik.values.type} values (comma separated)`
                : "Values"}
            </label>
            <input
              type="text"
              placeholder={
                formik.values.type === "occasion"
                  ? "Birthday, Anniversary"
                  : formik.values.type === "size"
                  ? "0.5kg, 1kg, 2kg"
                  : formik.values.type === "flavour"
                  ? "Vanilla, Chocolate"
                  : "Red, Blue, Black" // ✅ Color placeholder
              }
              value={multiValue}
              onChange={(e) => setMultiValue(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* IMAGE (OPTIONAL) */}
          <div>
            <label className="block font-medium mb-1">
              Image <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0] || null)
              }
            />

            {formik.values.image && (
              <img
                src={URL.createObjectURL(formik.values.image)}
                alt="preview"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Add Category
          </button>

        </form>
      </div>
    </div>
  );
}
