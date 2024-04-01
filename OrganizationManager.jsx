import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";

import Organization from "./Organization";
import OrganizationManagerTable from "./OrganizationManagerTable";

import organizationService from "services/organizationService";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "helper/utils";

import toastr from "toastr";

import debug from "sabio-debug";
const _logger = debug.extend("OrgManager");

function OrgManager() {
  const [orgData, setOrgData] = useState({
    arrayOfOrganizations: [],
    organizationsComponents: [],
    currentPage: 0,
    pageSize: 10,
    totalPages: 0,
    searchQuery: "",
  });

  const [orgToEdit, setOrgToEdit] = useState({});
  const [show, setShow] = useState(false);

  const onUpdateClick = (orgDetails) => {
    _logger("This is going to the modal", orgDetails);
    if (orgDetails.id) {
      organizationService
        .updateOrganization(orgDetails, orgDetails.id)
        .then(onUpdateOrganizationSuccess)
        .catch(onUpdateOrganizationError);
    } else {
      organizationService
        .addOrganization(orgDetails)
        .then(onAddOrganizationSuccess)
        .catch(onAddOrganizationError);
    }
    setOrgToEdit(orgDetails);
  };

const onUpdateOrganizationSuccess = (response) => {
    _logger("Update Successful!", response);
    toastr.success("Update Successful!");
  };

  const onUpdateOrganizationError = (error) => {
    _logger("Update Error", error);
    // toastr.error("Update Error!");
  };

  const onAddOrganizationSuccess = (response) => {
    _logger("Register Successful!", response);
    toastr.success("Register Successful!");
  };

  const onAddOrganizationError = (error) => {
    _logger("Register Error", error);
    toastr.error("Register Error!");
  };

  const onSearchSuccess = (response) => {
    _logger("Search Succesful", response);
    const searchResults = response.item.pagedItems;
    setOrgData((...prevState) => {
      let newState = { ...prevState };
      newState.arrayOfOrganizations = searchResults;
      newState.organizationsComponents = searchResults.map(mapOrganizations)
      return newState; 
    })
  };

  const onSearchError = (error) => {
    _logger("Search Error!", error);
  };

  const handleSearch = () => {
    if (orgData.searchQuery === "") {
      organizationService
        .getAll(0, 10)
        .then(onGetOrganizationSuccess)
        .catch(onGetOrganizationError);
    } else {
      organizationService
        .getSearchPage(0, 10, orgData.searchQuery)
        .then(onSearchSuccess)
        .catch(onSearchError);
    }
  };

  const handleSearchInputChange = (searchInput) => {
    _logger("HANDLESEARCH", searchInput)
    setOrgData((prevState) => ({
      ...prevState,
      searchQuery: searchInput.target.value,
    }));
  };

  const handleShow = () => {
      setShow(!show);
  };

  const [lookUps, setLookUps] = useState({
      statusTypes: [],
      organizationTypes: [],
  });

  useEffect(() => {
      _logger("Effect is loading (2)")
      lookUpService
          .lookUp(["OrganizationTypes", "StatusTypes" ])
          .then(onLookUpSuccess)
          .catch(onLookUpError);
    }, []);

  const onLookUpSuccess = (data) => {
  const { organizationTypes, statusTypes } = data.item;
  
      setLookUps((prevState) => {
          let newState = { ...prevState };
          newState.organizationTypes = organizationTypes;
          newState.mappedOrganizationTypes = organizationTypes.map(mapLookUpItem);
          newState.statusTypes = statusTypes;
          newState.mappedStatusTypes = statusTypes.map(mapLookUpItem);
          return newState;
      })
  };

    const onLookUpError = (error) => {
    _logger('Error getting types', error);
    };

    useEffect(() => {
        fetchOrganizations(orgData.currentPage, orgData.pageSize);
    }, []);

    const fetchOrganizations = (pageIndex, pageSize) => {
        organizationService
            .getAll(pageIndex, pageSize)
            .then(onGetOrganizationSuccess)
            .catch(onGetOrganizationError);
    };

    const navigate = useNavigate();

    const goToOrganizationDetail = useCallback(
      (organizationId) => {
        navigate(`/organizations/${organizationId}`);
      },
      [navigate]
    );

    const mapOrganizations = (anOrganization) => {
        _logger("MAPPING", anOrganization)
        return (
            <OrganizationManagerTable
                organization={anOrganization} 
                key={"ListA-" + anOrganization.id}
                orgLookUps = {lookUps}
                onHandleShow = {handleShow}
                onUpdateClick = {onUpdateClick}
                onOrgDetailClick= {goToOrganizationDetail}
            />
        );
    };

    const onGetOrganizationSuccess = (data) => {
        let organizationArray = data.item.pagedItems;
        setOrgData((prevState) => {
            const orgData = { ...prevState };
            orgData.arrayOfOrganizations = organizationArray;
            orgData.organizationsComponents = organizationArray.map(mapOrganizations);
            orgData.totalPages = data.item.totalPages;
            return orgData;
        });
    };

    const onGetOrganizationError = (error) => {
        _logger("GetOrganization Error", error);
        toastr.error("Error getting organizations");
    };

    const handlePageChange = (pageNumber) => {
        fetchOrganizations(pageNumber, 10);
        setOrgData((prevState) => ({ ...prevState, currentPage: pageNumber }));
    };

    let items = [];
    for (let number = 1; number <= orgData.totalPages; number++) {
        const onPageClick = () => {
            handlePageChange(number)
        };
        items.push(
            <Pagination.Item
                key={number}
                active={number === orgData.currentPage}
                onClick={onPageClick}>
                {number}
            </Pagination.Item>
        );
    }
    
    return (
        <>
                 <Modal
                        show={show}
                        onHide={handleShow}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Org</Modal.Title>
                        </Modal.Header>
                           <Organization OrgToEdit={orgToEdit}/>
                        <Modal.Body>
                    
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleShow}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
            <div className="organization-navbar-container">
               
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearchInputChange}
              />

              <Button
                className="organization-button-spacing"
                variant="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
           
            </div>
            <div className="organization-table-container">
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                            <th>Organization</th>
                            <th>Headline</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Created By</th>
                            <th>Member Count</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orgData.organizationsComponents}
                    </tbody>
                </Table>
            </div>
            <div className="organization-pagination-container">
                <Pagination>{items}</Pagination>
            </div>
        </>
    );
}

export default OrgManager;