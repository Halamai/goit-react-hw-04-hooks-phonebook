import { useState } from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";
import axios from "axios";

const initialState = { name: "", number: "" };

export default function ContactForm({ addContact }) {
  const [form, setForm] = useState(initialState);

  const onHandleChenge = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reactdz3-default-rtdb.firebaseio.com/contacts.json", form)
      .then((res) => addContact({ ...form, id: res.data.name }))
      .catch((err) => console.log(err))
      .finally(() => {
        reset();
      });
  };

  const reset = () => {
    setForm((prev) => ({ ...prev, name: "", number: "" }));
  };

  return (
    <form className={s.namelist} onSubmit={onHandleSubmit}>
      <label>
        Name:
        <input
          className={s.nameinput}
          value={form.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={onHandleChenge}
        />
      </label>
      <label>
        Number:
        <input
          className={s.nameinput}
          value={form.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={onHandleChenge}
        />
      </label>
      <button className={s.btncon} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
