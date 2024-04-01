using Sabio.Models;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Organizations;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IOrganizationService
    {
        public Paged<Organization> GetAll(int pageIndex, int pagedSize);
        public Organization GetByCreatedBy(int createdBy);
        public Organization GetById(int id);
        public Paged<Organization> GetSearchPage(int pageIndex, int pageSize, string query);
        public void DeleteById(int id);
        int Add(OrganizationAddRequest request, int userId);
        void Update(OrganizationUpdateRequest request, int userId);
    }
}