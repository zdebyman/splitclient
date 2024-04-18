import React from "react";
import { useAppState } from "../AppState.jsx";

const ExpenseForm = (props) => {
  const { state, dispatch } = useAppState();
  const { token } = state;
  const action = props.match.params.action;

  const [formData, setFormData] = React.useState({
    description: "",
    total_amount: "",
    payer: "",
    split_type: "amount",
    date: new Date().toISOString().slice(0, 10),
    splits_attributes: [{ payee: "", amount: "" }],
  });

  const actions = {
    new: () => {
      return fetch(state.url + "/expenses", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify({ expense: formData }),
      }).then((response) => response.json());
    },
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[action]().then((data) => {
      props.history.push("/balances");
    });
  };

  return (
    <div className="expenseForm">
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Total Amount</label>
        <input
          type="text"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleChange}
        />

        <label>Paid by</label>
        <input
          type="text"
          name="payer"
          value={formData.payer}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label>Split Type</label>
        <div key="amount" className="">
          <input
            id="amount"
            type="radio"
            checked={formData.split_type === "amount"}
            onChange={() => setFormData({ ...formData, split_type: "amount" })}
          />
          <label htmlFor="amount">AMOUNT</label>
        </div>
        <div key="percentage" className="">
          <input
            id="percentage"
            type="radio"
            checked={formData.split_type === "percentage"}
            onChange={() => setFormData({ ...formData, split_type: "percentage" })}
          />
          <label htmlFor="percentage">PERCENTAGE (%)</label>
        </div>

        <label>Splits</label>
        {formData.splits_attributes.map((split, index) => (
          <div key={index}>
            <label>Payee</label>
            <input
              type="text"
              name="payee"
              value={split.payee}
              onChange={(event) => {
                const newSplits = formData.splits_attributes.map((s, i) => {
                  if (index === i) {
                    return { ...s, payee: event.target.value };
                  }
                  return s;
                });
                setFormData({ ...formData, splits_attributes: newSplits });
              }}
            />

            <label>Amount</label>
            <input
              type="text"
              name="amount"
              value={split.amount}
              onChange={(event) => {
                const newSplits = formData.splits_attributes.map((s, i) => {
                  if (index === i) {
                    return { ...s, amount: event.target.value };
                  }
                  return s;
                });
                setFormData({ ...formData, splits_attributes: newSplits });
              }}
            />
          </div>
        ))}

        <button type="button" onClick={() => {
          setFormData({
            ...formData,
            splits_attributes: [...formData.splits_attributes, { payee: "", amount: "" }]
          });
        }}>Add Another Payee</button>

        <button type="submit">Create Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
