USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[Organization_SelectAll]    Script Date: 12/19/2023 7:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Michael Smith,
-- Create date: 12/16/2023
-- Description: Update proc for Organization Table
-- Code Reviewer:James Ho
-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE PROC [dbo].[Organization_SelectAll]
				@PageIndex int
				,@PageSize int

AS

/*

DECLARE 
		@PageIndex int = 0
		,@PageSize int = 3

EXECUTE dbo.Organization_SelectAll
		@PageIndex
		,@PageSize

*/

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT o.Id
      ,ot.Id as OrganizationTypeId
      ,ot.Name as OrganizationTypeName
	  ,o.Name
      ,o.Headline
      ,o.Description
      ,o.Logo
      ,l.Id as LocationId
	  ,l.LineOne
	  ,l.LineTwo
	  ,l.City
	  ,l.Zip
	  ,l.StateId
	  ,l.Latitude
	  ,l.LongItude
      ,o.Phone
      ,o.SiteUrl
      ,st.Id as StatusTypeId
	  ,st.Name as StatusTypeName
      ,dbo.fn_GetUserJSON(o.CreatedBy) as CreatedBy
      ,dbo.fn_GetUserJSON(o.ModifiedBy) as ModifiedBy
      ,o.DateCreated
      ,o.DateModified

	  ,TotalCount = COUNT(1) OVER()

  FROM dbo.Organization as o inner join dbo.OrganizationTypes as ot
  on o.OrganizationTypeId = ot.Id
  inner join dbo.StatusTypes as st
  on o.StatusId = st.Id
  inner join dbo.Locations as l
  on o.LocationId = l.Id
  

  ORDER BY o.Id

  OFFSET @offset ROWS
  FETCH NEXT @PageSize ROWS ONLY

END


GO
