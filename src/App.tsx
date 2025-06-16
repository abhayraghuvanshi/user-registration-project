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
