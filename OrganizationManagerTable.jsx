import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import PropTypes from "prop-types";
import "./organization.css"
import debug from "sabio-debug";

const _logger = debug.extend("OrganizationManagerTable")

function OrganizationManagerTable(props) {
  
    const [tableData] = useState(props.organization);
    _logger("Table Data", tableData)

    const anOrganization = props.organization

    const onModalShowHandler = () => {
        props.onHandleShow()
        props.onUpdateClick(tableData);
    }

    const handleOrgDetailClick = () => {
        props.onOrgDetailClick(anOrganization.id)
    };

    return (
        <>
            <tr>
                <td className="organization-manager">
                <Image
                    src={tableData.logo}
                />
                </td>
                <td> {tableData.headline}</td>

                <td>
                    {tableData.name}
                </td>

                <td>
                    {tableData.phone}
                </td>

                <td>
                    {tableData.createdBy.firstName}
                </td>

                <td>
                    {tableData.memberCount}
                </td>

                <td>
                    <Button 
                        variant="outline-primary organization-button-spacing"
                        onClick={onModalShowHandler}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="outline-primary"
                        className="organization-button-spacing"
                        onClick={handleOrgDetailClick}
                    >
                        Details
                    </Button>
                </td>
            </tr>
        </>
    )

}

export default OrganizationManagerTable;

OrganizationManagerTable.propTypes = {
    organization: PropTypes.shape({
        id: PropTypes.number.isRequired,
        organizationType: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        name: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        location: PropTypes.number,
        phone: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
        memberCount: PropTypes.number,
        status: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        createdBy: PropTypes.shape({
                id: PropTypes.number.isRequired,
                email: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                mi: PropTypes.string,
                roleId: PropTypes.shape({
                    id: PropTypes.number,
                    name: PropTypes.string,
                }),
        }),
        memberCount: PropTypes.number,
    }),
    orgLookUps: PropTypes.shape({
        statusTypes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            })
        ),
        organizationTypes :  PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            })
        ),
    }),
    onHandleShow: PropTypes.func,
    onUpdateClick: PropTypes.func,
    onOrgDetailClick: PropTypes.func
}; 