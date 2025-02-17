USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[Organization_Insert]    Script Date: 12/19/2023 7:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:	Michael Smith,
-- Create date: 12/16/2023,
-- Description:	Insert Proc for Organization Table,
-- Code Reviewer:James Ho

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[Organization_Insert]
										@Id INT OUTPUT
										,@OrganizationTypeId INT
										,@Name NVARCHAR(200)
										,@Headline NVARCHAR(200)
										,@Description NVARCHAR(MAX)
										,@Logo NVARCHAR(255)
										,@LocationId INT
										,@Phone NVARCHAR(50)
										,@SiteUrl NVARCHAR(255)
										,@StatusId INT
										,@CreatedBy INT
										,@ModifiedBy INT
								   


AS

/* ----TEST CODE -----

DECLARE 
									@Id int = 0
DECLARE		
									@OrganizationTypeId INT = 0
									,@Name NVARCHAR(200) = 'testName'
									,@Headline NVARCHAR(200) = 'testHeadline'
									,@Description NVARCHAR(MAX) = 'testDescription'
									,@Logo NVARCHAR(255) = 'testLogo'
									,@LocationId INT = 0
									,@Phone NVARCHAR(50) = '555-555-5555'
									,@SiteUrl NVARCHAR(255) = 'testSite.Url'
									,@StatusId INT = 0
									,@CreatedBy INT = 0
									,@ModifiedBy INT = 0

EXECUTE dbo.Organization_Insert
									@Id OUTPUT
									,@OrganizationTypeId
									,@Name
									,@Headline
									,@Description
									,@Logo
									,@LocationId
									,@Phone
									,@SiteUrl
									,@StatusId
									,@CreatedBy
									,@ModifiedBy
		

SELECT 
									@Id 
									,@OrganizationTypeId
									,@Name
									,@Headline
									,@Description
									,@Logo
									,@LocationId
									,@Phone
									,@SiteUrl
									,@StatusId
									,@CreatedBy
									,@ModifiedBy
FROM dbo.Organization
WHERE Id = @Id

*/

BEGIN



INSERT INTO [dbo].[Organization]
								   ([OrganizationTypeId]
								   ,[Name]
								   ,[Headline]
								   ,[Description]
								   ,[Logo]
								   ,[LocationId]
								   ,[Phone]
								   ,[SiteUrl]
								   ,[StatusId]
								   ,[CreatedBy]
								   ,[ModifiedBy])
VALUES
								   (@OrganizationTypeId
								   ,@Name
								   ,@Headline
								   ,@Description
								   ,@Logo
								   ,@LocationId
								   ,@Phone
								   ,@SiteUrl
								   ,@StatusId
								   ,@CreatedBy
								   ,@ModifiedBy);

SET @Id = SCOPE_IDENTITY()


END


GO
