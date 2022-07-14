import { Grid } from "@mui/material";
import { Form } from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import React, { useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import * as userService from "../../services/userService";

const UserForm = (props) => {
  const {
    values,
    handleInputChange,
    errors,
    setErrors,
    setValues,
    initialFieldValues,
    recordForEdit,
    notify,
    setNotify,
  } = props;

  async function postUserData() {
    const response = await userService.postUser(values);
    if (response.name === "AxiosError") {
      setNotify({
        isOpen: true,
        message:
          "Request Failed! Please make sure you entered your name / mobile number correctly",
        type: "error",
      });
    } else {
      setNotify({
        isOpen: true,
        message: "User Added Successfully",
        type: "success",
      });
      handleClear();
    }
  }

  async function updateUserData() {
    const response = await userService.updateUser(values);
    if (response.name === "AxiosError") {
      setNotify({
        isOpen: true,
        message:
          "Request Failed! Please make sure you entered your name / mobile number correctly",
        type: "error",
      });
    } else {
      setNotify({
        isOpen: true,
        message: "User Updated Successfully",
        type: "success",
      });
    }
  }

  useEffect(() => {
    if (recordForEdit != null) {
      setValues(recordForEdit);
    }
  }, [recordForEdit, setValues]);

  const validate = () => {
    const temp = {};
    temp.name = values.name ? "" : "This field is required";
    temp.email = isEmail(values.email)
      ? ""
      : "Please enter email in format abc@xyz.com";
    temp.phone = /^\d{10}$/.test(values.phone)
      ? ""
      : "Please enter 10 digit mobile number";
    temp.hobbies = /^(([a-zA-Z0-9 ](,)?)*)+$/.test(values.hobbies)
      ? ""
      : "Please enter ' , ' seperated list of hobbies";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      values.hobbies =
        typeof values.hobbies === "string"
          ? values.hobbies.split(",").filter((i) => i !== "")
          : values.hobbies;
      if (recordForEdit !== null) {
        updateUserData();
      } else {
        postUserData();
      }
    }
  };

  const handleClear = () => {
    setValues(initialFieldValues);
  };

  return (
    <Form>
      <Grid container p={2}>
        <Grid item xs={100}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="phone"
            label="Phone Number"
            value={values.phone}
            onChange={handleInputChange}
            type="number"
            error={errors.phone}
          />
          <Controls.Input
            name="hobbies"
            label="Hobbies (' , ' seperated)"
            value={values.hobbies}
            onChange={handleInputChange}
            error={errors.hobbies}
          />
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Controls.MuiButton text="Save" onClick={handleSubmit} />
            <Controls.MuiButton
              sx={{ mx: 2 }}
              text="Clear"
              onClick={handleClear}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default UserForm;
