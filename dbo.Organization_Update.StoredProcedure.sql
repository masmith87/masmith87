USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[Organization_Update]    Script Date: 12/19/2023 7:52:07 PM ******/
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




CREATE PROC [dbo].[Organization_Update]
										@OrganizationTypeId INT
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
										,@Id INT OUTPUT

AS

BEGIN

UPDATE dbo.Organization

SET
		OrganizationTypeId = @OrganizationTypeId
		,[Name] = @Name
		,Headline = @Headline
		,[Description] = @Description
		,Logo = @Logo
		,LocationId = @LocationId
		,Phone = @Phone
		,SiteUrl = @SiteUrl
		,StatusId = @StatusId
		,CreatedBy = @CreatedBy
		,ModifiedBy = @ModifiedBy

WHERE	Id = @Id;



END


GO
