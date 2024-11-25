import React, { useState } from "react";
import axios from "axios";
import "../css/forms.css";
import SearchCustomer from "./CreateWorkOrder/SearchCustomer";
import SelectCar from "./CreateWorkOrder/SelectCar";
import DescriptionInput from "./CreateWorkOrder/AddDescription";

function CreateWorkOrderForm() {
  const [formData, setFormData] = useState({
    customer: null, // Клиент
    car: "", // Кола
    description: "", // Описание
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Функция за актуализиране на полетата
  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Проверка за валидност на формуляра
  const isFormValid = () => {
    return (
      formData.customer &&
      formData.car &&
      (formData.description || "").trim() !== ""
    );
  };

  // Функция за обработка при изпращане на формата
  const handleSubmit = async (event) => {
    console.log(formData);
    event.preventDefault(); // Спира презареждането на страницата

    if (!isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true); // Активира индикатора за изпращане

    const url =
      "http://127.0.0.1:8000/api/work-orders/workorder/create-new-work-order/";

    try {
      console.log("Sending data:", formData); // Лог за дебъгване
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json", // Уверяваме се, че данните са JSON
        },
      });

      console.log("Form submitted successfully:", response.data);
      alert("Work order created successfully!");

      // Нулиране на формуляра
      setFormData({
        customer: null,
        car: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        alert(`Server error: ${error.response.data.message}`);
      } else {
        alert("An error occurred while creating the work order.");
      }
    } finally {
      setIsSubmitting(false); // Изключва индикатора за изпращане
    }
  };
    
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>New Work Order Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Избор на клиент */}
          <SearchCustomer
            onSelectClient={(client) => updateFormData("customer", client)}
          />

          {/* Избор на кола */}
          {formData.customer && (
            <SelectCar
              selectedClient={formData.customer}
              onSelectCar={(car) => updateFormData("car", car)}
            />
          )}

          {/* Поле за описание */}
          {formData.customer && (
            <DescriptionInput
              onSaveDescription={(description) =>
                updateFormData("description", description)
              }
            />
          )}

          {/* Бутон за изпращане */}
          {isFormValid() && (
          <button
            type="submit"
            className="submit-btn"
            // disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        )}
        </form>
      </div>
    </div>
  );
}

export default CreateWorkOrderForm;

// import React, { useState } from "react";
// import axios from "axios";

// function SimplePostForm() {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/work-orders/workorder/create-new-work-order/", data);
//       console.log("Response:", response.data);
//       alert("Data submitted successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while submitting the data.");
//     }
//   };

//   return (
//     <div>
//       <h1>Simple POST Request</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={data.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default SimplePostForm;
