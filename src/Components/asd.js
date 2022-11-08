import React, {useEffect, useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Form,
  Input,
} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

// yup
const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("Lütfen isim giriniz!")
    .required("Zorunlu alan!")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Lütfen harfleri kullanın"
    ),
  surname: yup
    .string()
    .typeError("Lütfen soyisim giriniz!")
    .required("Zorunlu alan!")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Lütfen harfleri kullanın"
    ),
  phone: yup
    .string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "Lütfen telefon numarası giriniz!"
    )
    .required("Zorunlu alan!"),
  email: yup
    .string()
    .typeError("Lütfen mail giriniz!")
    .required("Zorunlu alan!")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Lütfen doğru email giriniz! "
    ),
});

const defaultvalues = {
  name: "",
  surname: "",
  phone: "",
  email: "",
};

function RehberTable({people, setPeople}) {
  // delete
  const handleDelete = (id) => {
    setPeople((people) => people.filter((ind) => ind.id !== id));
  };

  // modal function
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggle = () => setModal(!modal);

  // yup
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
    defaultValues: defaultvalues,
  });

  useEffect(() => {
    // console.log(people);
  }, [people]);

  // button onclick
  const modalClick = (data) => {
    setPeople([
      ...people,
      {
        id: Math.floor(Math.random() * 9999999999),
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        email: data.email,
      },
    ]);
    console.log(data);
    toggle();
  };

  // Edit
  const modalEdit = () => {
    setEdit(true);
    toggle();
  };
  const addPeople = () => {
    setEdit(false);
    toggle();
  };

  return (
    <div>
      <div>
        <div className="modalbtn">
          <Button color="info  text-white" onClick={() => addPeople()}>
            KİŞİ EKLE
          </Button>

          <Modal isOpen={modal} toggle={toggle}>
            <Form onSubmit={handleSubmit((data) => modalClick(data))}>
              <ModalHeader toggle={toggle}>Kişi Ekle</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="exampleName">Adı:</Label>
                  <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        className="form-control "
                        placeholder="Adınızı giriniz"
                        autoComplete="off"
                        defaultValue={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        required
                      />
                    )}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSurname">Soyad:</Label>
                  <Controller
                    control={control}
                    name="surname"
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder="Soyadınızı giriniz"
                        autoComplete="off"
                        onChange={onChange}
                        onBlur={onBlur}
                        defaultValue={value}
                        required
                      />
                    )}
                  />
                  {errors.surname && <p>{errors.surname.message}</p>}
                </FormGroup>
                <FormGroup>
                  <Label for="examplePhone">Telefon:</Label>
                  <Controller
                    control={control}
                    name="phone"
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder="Telefon numaranızı giriniz"
                        autoComplete="off"
                        onChange={onChange}
                        onBlur={onBlur}
                        defaultValue={value}
                        required
                      />
                    )}
                  />
                  {errors.phone && <p>{errors.phone.message}</p>}
                  <FormGroup>
                    <Label for="exampleEmail">Email:</Label>
                    <Controller
                      control={control}
                      name="email"
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          placeholder="Email giriniz"
                          autoComplete="off"
                          onChange={onChange}
                          onBlur={onBlur}
                          defaultValue={value}
                          required
                        />
                      )}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </FormGroup>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>
                  Kapat
                </Button>
                <Button color="danger" type="submit">
                  {edit == true ? "Düzenle" : "Kaydet"}
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </div>
      <div className="table">
        <div>
          <table className="table table-info table-hover">
            <thead>
              <tr>
                <th>Adı</th>
                <th>Soyadı</th>
                <th>Telefon</th>
                <th>Email</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {people.map((val) => {
                return (
                  <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>{val.surname}</td>
                    <td>{val.phone}</td>
                    <td>{val.email}</td>
                    <td>
                      <Button
                        type="button"
                        color="danger"
                        onClick={() => handleDelete(val.id)}
                      >
                        Sil
                      </Button>
                      <Button onClick={modalEdit} color="warning">
                        Düzenle
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RehberTable;
