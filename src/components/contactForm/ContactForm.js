import React, { useEffect, useState } from "react";
import styles from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { contactsItemsSelector, loadingSelector } from "../../redux/selector";
import { addNewContacts, getAllContacts } from "../../redux/operations";

const initialState = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const [state, setState] = useState(initialState);

  const { items, loading } = useSelector((state) => {
    return {
      items: contactsItemsSelector(state),
      loading: loadingSelector(state),
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const handleSubmit = (name, number) => {
    const isDuplicate = items.some((item) => item.name === name);

    if (isDuplicate) {
      alert(name + " is already in contacts ");
      return;
    }

    const newContact = {
      name: name,
      number: number,
    };

    dispatch(addNewContacts(newContact));
  };

  const handleChange = (evt) => {
    setState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    handleSubmit(state.name, state.number);
    setState({ name: "", number: "" });
  };
  return (
    <form className={styles.formMain} onSubmit={onSubmit}>
      <label className={styles.formLabel}>
        Name
        <input
          className={styles.formInput}
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
          placeholder="Enter your name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={styles.formLabel}>
        Number
        <input
          className={styles.formInput}
          type="tel"
          name="number"
          onChange={handleChange}
          value={state.number}
          placeholder="123-45-67"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>

      <button type="submit" className={styles.formBtn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

// class ContactForm extends Component {

//   state = {
//     name: "",
//     number: "",
//   };

//   handleSubmit = (name, number) => {
//     const isDuplicate = this.props.items.some((item) => item.name === name);

//     if (isDuplicate) {
//       alert(name + " is already in contacts ");
//       return;
//     }

//     const newContact = {
//       id: uuidv4(),
//       name: name,
//       number: number,
//     };

//     this.props.addNewContacts(newContact);
//   };

//   handleChange = (evt) => {
//     this.setState({
//       [evt.target.name]: evt.target.value,
//     });
//   };

//   onSubmit = (evt) => {
//     evt.preventDefault();
//     this.handleSubmit(this.state.name, this.state.number);
//     this.setState({ name: "", number: "" });
//   };
//   render() {
//     return (

//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     items: contactsItemsSelector(state),
//     loading: loadingSelector(state),
//   };
// };

// const mapDispatchToProps = {
//   addNewContacts,
//   getAllContacts,
// };
// export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
