import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
const Page1 = () => {
  const { register, handleSubmit } = useForm();


  const handleForm = async (data) => {
    console.log(data);
    const res = await fetch("http://localhost:2000/api/v1/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    const result = await res.json();
    alert(`Your bill for ${result.receipt.totalTime} is ${result.receipt.totalBill}`)
    console.log(result)
  };

  const [state, setState] = useState(false);

  return (
    <div>
        <div>
            <NavLink to="/get-report">Get your daily report</NavLink>
        </div>
      <h1>book rent</h1>
     <div>
     <form onSubmit={handleSubmit(handleForm)}>
        <label>
          book-id
          <input type="text" placeholder="BookId" {...register("bookId")} />
        </label>
        <label>
          book-title
          <input
            type="text"
            placeholder="bookTitle"
            {...register("bookTitle")}
          />
        </label>
        <label>
          name
          <input type="text" placeholder="name" {...register("name")} />
        </label>
        <label>
          contact
          <input type="number" placeholder="contact" {...register("contact")} />
        </label>
        <label>
          DateTime
          <input
            type="datetime-local"
            placeholder="dateTime"
            {...register("dateTime")}
          />
        </label>

        <button type="button" onClick={() => setState(true)}>
          Next
        </button>

        {state && (
          <>
            <div>
              <label>
                Return DateTime
                <input
                  type="datetime-local"
                  placeholder="returndateTime"
                  {...register("returnDateTime")}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
     </div>
    </div>
  );
};

export default Page1;
