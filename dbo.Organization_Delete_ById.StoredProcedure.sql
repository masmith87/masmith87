USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[Organization_Delete_ById]    Script Date: 12/19/2023 7:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Michael Smith,
-- Create date: 12/16/2023
-- Description: Update proc for Organization Table
-- Code Reviewer:
-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================




CREATE PROC [dbo].[Organization_Delete_ById]
			@Id int

AS

/*

DECLARE @Id int = 0;

SELECT [Id]
      ,[OrganizationTypeId]
      ,[Name]
      ,[Headline]
      ,[Description]
      ,[Logo]
      ,[LocationId]
      ,[Phone]
      ,[SiteUrl]
      ,[StatusId]
      ,[CreatedBy]
      ,[ModifiedBy]
      ,[DateCreated]
      ,[DateModified] 
FROM dbo.Organization
WHERE Id = @Id


EXECUTE dbo.Organization_Delete_ById

SELECT [Id]
      ,[OrganizationTypeId]
      ,[Name]
      ,[Headline]
      ,[Description]
      ,[Logo]
      ,[LocationId]
      ,[Phone]
      ,[SiteUrl]
      ,[StatusId]
      ,[CreatedBy]
      ,[ModifiedBy]
      ,[DateCreated]
      ,[DateModified]
FROM dbo.Organization
WHERE Id = @Id

*/

BEGIN

DELETE FROM [dbo].[Organization]
      
WHERE Id = @Id

END
GO
