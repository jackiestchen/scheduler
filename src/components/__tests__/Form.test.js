import React from "react";
import { cleanup, render } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without crashing", () => {
    render(<Form interviewers={interviewers} />);
  });

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const { getByText, onSave } = render(<Form interviewers={interviewers} />);

    expect(getByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    /* 3. validation is not shown */
    const { queryByText, onSave } = render(
      <Form interviewers={interviewers} />
    );

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  
});