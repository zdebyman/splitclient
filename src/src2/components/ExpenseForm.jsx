import React from "react"
import { useAppState } from "../AppState.jsx";

const ExpenseForm = (props) => {
  const { state, dispatch } = useAppState();
  const { token } = state;
  const action = props.match.params.action;
  const [formData, setFormData] = React.useState(state[action]);
  const actions = {
    new: () => {
      return fetch(state.url + "/expenses", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[action]().then((data) => {
      //props.getNotes();
      props.history.push("/dashboard/");
    });
  };

  return (
    <div className="expenseForm">
      <h1>Add Expense</h1>

      <form onSubmit={handleSubmit}>
        description
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        amout
        <input
          type="text"
          name="amount"
          value={formData.body}
          onChange={handleChange}
        />

        payed by
        <input
          type="text"
          name="payed_by"
          value={formData.body}
          onChange={handleChange}
        />

        split  type
        <div key={"amount"} className="">
              <input
                id={"amount"}
                name="notification-method"
                type="radio"
                checked={formData.split_type === "amount"}
                onChange={() => {
                  setFormData({ ...formData, split_type: "amount" });
                }}
                className=""
              />
              <label htmlFor={"amount"} className="">
                AMOUNT
              </label>
        </div>
        <div key={"percentage"} className="">
              <input
                id={"percentage"}
                name="notification-method"
                type="radio"
                checked={formData.split_type === "percentage"}
                onChange={() => {
                  setFormData({ ...formData, split_type: "percentage" });
                }}
                className=""
              />
              <label htmlFor={"percentage"} className="">
                %
              </label>
        </div>


        SPLITS
        <div>
          {formData.splits_attributes.map((split, index) => {
            return (
              <div key={index}>
                <input 
                  type="text"
                  name="payee_id"
                  value={split.payee_id}
                  onChange={(event) => {
                    const newSplits = formData.splits_attributes.map((s, i) => {
                      if (index === i) {
                        return { ...s, payee_id: event.target.value };
                      } else {
                        return s;
                      }
                    });
                    setFormData({ ...formData, splits_attributes: newSplits });
                  }}
                />

                <input 
                  type="text"
                  name="value"
                  value={split.value}
                  onChange={(event) => {
                    const newSplits = formData.splits_attributes.map((s, i) => {
                      if (index === i) {
                        return { ...s, value: event.target.value };
                      } else {
                        return s;
                      }
                    });
                    setFormData({ ...formData, splits_attributes: newSplits });
                  }}
                />
              </div>
            );
          })}
        </div>

        <button type="button" onClick={() => {
          setFormData({ ...formData, splits_attributes: [...formData.splits_attributes, { payee_id: "", value: "" }] });
        }}> Add </button>

        <button type="submit"> CREATE EXPENSE </button>
      </form>
    </div>
  );
}

export default ExpenseForm