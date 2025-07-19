import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Form = () => {
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string().required("Required"),
            })}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="email" name="email" placeholder="Email" />
                <Field type="password" name="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}