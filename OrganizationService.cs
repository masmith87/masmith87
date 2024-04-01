using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Locations;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Organizations;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class OrganizationService : IOrganizationService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public OrganizationService(IDataProvider data, ILookUpService lookUp)
        {
            _data = data;
            _lookUpService = lookUp;
        }

        #region Gets/Mapper
        public Organization GetById(int id)
        {
            string procName = "[dbo].[Organization_Select_ById]";

            Organization organization = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
               paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                organization = MapSingleOrganization(reader);
            });
            return organization;
        }

        public Organization GetByCreatedBy(int createdBy)
        {
            string procName = "[dbo].[Organization_Select_ByCreatedBy]";

            Organization organization = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@CreatedBy", createdBy);
            }, delegate (IDataReader reader, short set)
            {
                organization = MapSingleOrganization(reader);
            });
            return organization;
        }

        public Paged<Organization> GetAll(int pageIndex, int pageSize)
        {
            Paged<Organization> pagedList = null;
            List<Organization> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Organization_SelectAll",
                (param) =>
                {
                    param.AddWithValue("PageIndex", pageIndex);
                    param.AddWithValue("PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    Organization organization = MapSingleOrganization(reader);
                    totalCount = reader.GetSafeInt32(recordSetIndex);

                    if (list == null)
                    {
                        list = new List<Organization>();
                    }

                    list.Add(organization);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Organization>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Organization> GetSearchPage(int pageIndex, int pageSize, string query)
        {
            Paged<Organization> pagedResult = null;

            List<Organization> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Organization_Search",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                    paramCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Organization organization = MapSingleOrganization(reader);

                    int startingIndex = 0;
                   

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<Organization>();
                    }

                    result.Add(organization);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Organization>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        private static Organization MapSingleOrganization(IDataReader reader)
        {
            Organization organization = new Organization();

            int startingIndex = 0;

            organization.Id = reader.GetSafeInt32(startingIndex++);

            organization.OrganizationType = new LookUp();

            organization.OrganizationType.Id = reader.GetSafeInt32(startingIndex++);
            organization.OrganizationType.Name = reader.GetSafeString(startingIndex++);

            organization.Name = reader.GetSafeString(startingIndex++);
            organization.Headline = reader.GetSafeString(startingIndex++);
            organization.Description = reader.GetSafeString(startingIndex++);
            organization.Logo = reader.GetSafeString(startingIndex++);

           organization.Location = reader.GetSafeInt32(startingIndex++);

            organization.Phone = reader.GetSafeString(startingIndex++);
            organization.SiteUrl = reader.GetSafeString(startingIndex++);
            organization.MemberCount = reader.GetSafeInt32(startingIndex++);

            organization.Status = new LookUp();
            organization.Status.Id = reader.GetSafeInt32(startingIndex++);
            organization.Status.Name = reader.GetSafeString(startingIndex++);

            organization.CreatedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            organization.ModifiedBy = reader.DeserializeObject<BaseUser>(startingIndex++);

            organization.DateCreated = reader.GetSafeDateTime(startingIndex++);
            organization.DateModified = reader.GetSafeDateTime(startingIndex++);

            return organization;
        }
        #endregion

        #region Add/Update/CommonParams
        public int Add(OrganizationAddRequest request, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Organization_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(request, collection);
                collection.AddWithValue("@CreatedBy", userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                collection.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public void Update(OrganizationUpdateRequest request, int userId)
        {
            string procName = "[dbo].[Organization_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(request, collection);
                collection.AddWithValue("@UserId", userId);
                collection.AddWithValue("@Id", request.Id);
            }, returnParameters: null);
        }

        private static void AddCommonParams(OrganizationAddRequest request, SqlParameterCollection collection)
        {
            collection.AddWithValue("@OrganizationTypeId", request.OrganizationTypeId);
            collection.AddWithValue("@Name", request.Name);
            collection.AddWithValue("@Headline", request.Headline);
            collection.AddWithValue("@Description", request.Description);
            collection.AddWithValue("@Logo", request.Logo);
            collection.AddWithValue("@LocationId", request.LocationId);
            collection.AddWithValue("@Phone", request.Phone);
            collection.AddWithValue("@SiteUrl", request.SiteUrl);
            collection.AddWithValue("@StatusId", request.StatusId);
        } 
        #endregion

        public void DeleteById(int id)
        {
            string procName = "[dbo].[Organization_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            }, returnParameters: null);
        }
    }
}
