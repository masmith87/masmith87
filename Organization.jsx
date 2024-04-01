import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./OrganizationsForms.css";
import toastr from "toastr";
import organizationSchema from "schemas/organizationSchema";
import organizationService from "services/organizationService";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "helper/utils";
import FileUpload from "components/files/FileUpload";
import { Image, Col } from "react-bootstrap";
import debug from "sabio-debug";
import PropTypes from "prop-types";
const _logger = debug.extend("Organization");

function Organization({ isSetToWorkflow, onOrgCallback }) {
  const [formData, setFormData] = useState({
    organization: {
      organizationTypeId: 0,
      name: "",
      headline: "",
      description: "",
      logo: "",
      phone: "",
      siteUrl: "",
      statusId: 1,
    },
  });

  const [lookUps, setLookUps] = useState({
    organizationTypes: [],
    mappedOrganizationTypes: [],
  });

  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    lookUpService
      .lookUp(["OrganizationTypes", "StatusTypes"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);
  useEffect(() => {
    if (isSetToWorkflow === true) {
      onOrgCallback(formData);
    }
  }, [formData]);

  const onLookUpSuccess = (data) => {
    const { organizationTypes, statusTypes } = data.item;
    setLookUps((prevState) => {
      let newState = { ...prevState };
      newState.organizationTypes = organizationTypes;
      newState.mappedOrganizationTypes = organizationTypes.map(mapLookUpItem);
      newState.statusTypes = statusTypes;
      newState.mappedStatusTypes = statusTypes.map(mapLookUpItem);
      return newState;
    });
  };

  const onLookUpError = (error) => {
    _logger("Error getting types", error);
  };

  const onRegisterOrgSubmit = (values) => {
    _logger("Form submitted: ", values);

    organizationService
      .addOrganization(values)
      .then(onRegisterOrgSubmitSuccess)
      .catch(onRegisterOrgSubmitError);
  };

  const onProfilePicSubmit = (response) => {
    _logger(response.items[0].url);
    if (response.items[0].url !== null) {
      setShowImage(false);
      setFormData((prevState) => {
        const pd = { ...prevState };
        pd.organization.logo = response.items[0].url;
        return pd;
      });
    }
  };

  const onRegisterOrgSubmitSuccess = (response) => {
    _logger("Registered Successful!", response);
    toastr.success("Registeration Successful!");
  };

  const onRegisterOrgSubmitError = (error) => {
    _logger("Register Error", error);
    toastr.error("Register Error!");
  };

  const onChange = (event) => {
    const target = event.target;
    const newOrgValue = target.value;
    const nameOfField = target.name;

    setFormData((prevState) => {
      const newOrgObject = {
        ...prevState,
      };

      newOrgObject[nameOfField] = newOrgValue;
      _logger(newOrgObject);
      return newOrgObject;
    });
  };

  return (
    <div className="container">
      <h1 className="text-center">Register Your Organization</h1>
      <Formik
        enableReinitialize={true}
        initialValues={formData.organization}
        onSubmit={onRegisterOrgSubmit}
        validation={organizationSchema}
      >
        <Form
          className="shadow-lg p-5 rounded w-50 mx-auto mt-3 form"
          onChange={onChange}
        >
          <Col lg={12} md={12} className="mb-3 flex-container">
            <div className=" mb-3 profile-pic-uploader">
              <span className="input-gt-borderless fw-bold">Upload Logo</span>
              <div className="mt-3 flex-item-left">
                {!showImage && (
                  <Image
                    src={formData.organization.logo}
                    className="org-logo"
                    alt=""
                  />
                )}
                {showImage && (
                  <FileUpload
                    uploadComplete={onProfilePicSubmit}
                    isMultiple={false}
                    name="logo"
                  />
                )}
              </div>
            </div>
          </Col>
          <div className="input-group mb-3">
            <Field
              className="form-control"
              as="select"
              name="organizationTypeId"
            >
              <option value="">Select Organization Type</option>
              {lookUps.mappedOrganizationTypes}
            </Field>
          </div>
          <div className="input-group mb-3">
            <Field
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-center error-message"
            />
          </div>
          <div className="input-group mb-3">
            <Field
              type="text"
              className="form-control"
              placeholder="Headline"
              name="headline"
            />
            <ErrorMessage
              name="headline"
              component="div"
              className="text-center error-message"
            />
          </div>
          <div className="input-group mb-3">
            <Field
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-center error-message"
            />
          </div>
          <div className="input-group mb-3">
            <Field
              type="text"
              className="form-control"
              placeholder="Phone Number"
              name="phone"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-center error-message"
            />
          </div>
          <div className="input-group mb-3">
            <Field
              type="text"
              className="form-control"
              placeholder="Website"
              name="siteUrl"
            />
            <ErrorMessage
              name="siteUrl"
              component="div"
              className="text-center error-message"
            />
          </div>
          {!isSetToWorkflow && (
            <button
              id="organizationRedirect"
              type="submit"
              className="btn mx-auto btn-primary"
            >
              Register
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
}
Organization.propTypes = {
  isSetToWorkflow: PropTypes.bool,
  onOrgCallback: PropTypes.func,
};
export default Organization;
