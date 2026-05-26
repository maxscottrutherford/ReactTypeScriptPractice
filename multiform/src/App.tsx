import { useState } from "react";

type FormData = {
  name: string;
  birthday: string;
  email: string;
  password: string;
};

const App = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthday: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted: ", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formStep === 1 && (
          <div>
            <h2>Step 1: Personal Info</h2>
            <div>
              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div>
              <label>Birthday</label>
              <input
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div>
            <h2>Step 2: Account Info</h2>

            <div>
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        )}

        {formStep === 3 && (
          <div>
            <h2>Step 3: Confirmation Page</h2>
            <p>Name: {formData.name}</p>
            <p>Birthday: {formData.birthday}</p>
            <p>Email: {formData.email}</p>
            <p>
              Password: {showPassword ? formData.password : "*".repeat(formData.password.length)}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </p>
          </div>
        )}

        <div>
          {formStep > 1 && (
            <button type="button" onClick={() => setFormStep(formStep - 1)}>
              Back
            </button>
          )}
          {formStep < 3 && (
            <button type="button" onClick={() => setFormStep(formStep + 1)}>
              Next
            </button>
          )}
          {formStep === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default App;
