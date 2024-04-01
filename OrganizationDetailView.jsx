import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import organizationService from "services/organizationService";

import "./organization.css";

import debug from "sabio-debug";

const _logger = debug.extend("OrganizationDetailView");

function OrganizationDetailView() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleSuccess(response) {
    setOrganization(response.item);
    setLoading(false);
  }

  function handleError(response) {
    _logger("Error fetching organization details", response);
    setLoading(false);
  }

  function fetchOrganizationDetailView() {
    _logger("Fetching organization details for ID:", id);
    organizationService
        .getById(id)
        .then(handleSuccess)
        .catch(handleError);
  }
  useEffect(() => {
      fetchOrganizationDetailView();
    },
    [id]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!organization) {
    return <div>Organization not found or error in fetching organization details.</div>;
  }

  return (
        <>
            <Card className="organization-detail">
            <Card.Body>
              <Image
                src={organization.logo}/>
                <Card.Title>{organization.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organization.headline}</Card.Subtitle>
                <Card.Text>
                  {organization.description}
                </Card.Text>
                  
                <Card.Link href="#">{organization.siteUrl}</Card.Link>
            </Card.Body>
            </Card>
        </>
  );
}

export default OrganizationDetailView;