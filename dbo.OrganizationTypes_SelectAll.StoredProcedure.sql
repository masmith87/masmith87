USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[OrganizationTypes_SelectAll]    Script Date: 12/19/2023 7:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Michael Smith
-- Create date: 12/17/2023
-- Description:	SelectAll Procs for OrganizationTypes table
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================



CREATE PROC [dbo].[OrganizationTypes_SelectAll]


AS

/*

EXECUTE dbo.OrganizationTypes_SelectAll

*/

BEGIN


SELECT Id
      ,[Name]

 FROM [dbo].[OrganizationTypes]

END


GO
