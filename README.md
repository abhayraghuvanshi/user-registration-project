# react.js Dynamic Form Renderer
---
first, you should install node and npm.

1. create vite project  
    `npm create vite@4.1.0 with Project name: user-registration-project framework React variant TypeScript && cd user-registration-project`

2. init npm  
    `npm install`

3. install bootstrap@5.2.3  
    `npm install bootstrap@5.2.3`

4. touch index.css to delete all contain as we have bootstrap.min.css
```javascript

```

5. touch App.css to delete all contain as we have bootstrap.min.css
```javascript

```

6. touch main.tsx to update bootstrap.min.css
```javascript
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App'
    import 'bootstrap/dist/css/bootstrap.min.css'

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
```

7. touch App.tsx
```javascript
    import DynamicFormRenderer from "./components/DynamicFormRenderer";

    function App() {
      const schema = {
        title: "User Registration",
        fields: [
          { label: "Name", type: "text", name: "name", required: true },
          { label: "Age", type: "number", name: "age" },
          { label: "Subscribe", type: "checkbox", name: "subscribe" },
          {
            label: "Gender",
            type: "select",
            name: "gender",
            options: [" ", "Male", "Female", "Other"],
          },
        ],
      };
      return (
        <div>
          <DynamicFormRenderer title={schema.title} fields={schema.fields} />
        </div>
      );
    }

    export default App;
```

8. make directory components inside src 
    `mkdir components`

9. touch DynamicFormRenderer.tsx inside components
```javascript
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

```

10. start server  
    `npm run dev`

11. open browser: [http://localhost:5174](http://localhost:5174)

12. ![react Dynamic Form Renderer application default input page ](https://github.com/abhayraghuvanshi/user-registration-project/blob/main/Application_input_screen_1.JPG?raw=true)

13. ![ User Registration input ](image_url_2)

14. ![ User Registration input on submit ](image_url_3)

15. ![ User Registration update ](image_url_4)

---
if you clone this repository to local, just `npm install` and `npm run dev`.
