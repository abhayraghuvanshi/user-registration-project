import React, { useState } from "react";
interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

interface FormSchema {
  title: string;
  fields: Field[];
}
function DynamicFormRenderer(formSchema: FormSchema) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;

    setFormData((prev) => ({
      ...prev,
      [target.name]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedData(formData);
    console.log("Submitted Data:", formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{formSchema.title}</h2>
        {formSchema.fields.map((field) => (
          <div key={field.name}>
            <label className="form-label">
              {field.label}
              {field.type === "text" ? (
                <input
                  className="form-control"
                  type="text"
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : field.type === "number" ? (
                <input
                  className="form-control"
                  type="number"
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : field.type === "checkbox" ? (
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : field.type === "select" && field.options ? (
                <select
                  className="form-select"
                  name={field.name}
                  onChange={handleChange}
                >
                  {field.options.map((option) => (
                    <option key={option} value={formData[option]}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}
            </label>
          </div>
        ))}
        <p></p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DynamicFormRenderer;
