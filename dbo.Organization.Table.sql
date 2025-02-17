USE [RumbApp]
GO
/****** Object:  Table [dbo].[Organization]    Script Date: 12/19/2023 7:52:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organization](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationTypeId] [int] NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Headline] [nvarchar](200) NULL,
	[Description] [nvarchar](max) NULL,
	[Logo] [nvarchar](255) NULL,
	[LocationId] [int] NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[SiteUrl] [nvarchar](255) NULL,
	[StatusId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Organization] ADD  CONSTRAINT [DF_Organization_StatusId]  DEFAULT ((1)) FOR [StatusId]
GO
ALTER TABLE [dbo].[Organization] ADD  CONSTRAINT [DF_Organization_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Organization] ADD  CONSTRAINT [DF_Organization_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_Locations] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_Locations]
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_OrganizationTypes] FOREIGN KEY([OrganizationTypeId])
REFERENCES [dbo].[OrganizationTypes] ([Id])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_OrganizationTypes]
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_StatusTypes] FOREIGN KEY([StatusId])
REFERENCES [dbo].[StatusTypes] ([Id])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_StatusTypes]
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_Users]
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_Users1]
GO
