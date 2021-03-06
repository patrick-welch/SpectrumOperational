CREATE TABLE [dbo].[Address]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1000, 1), 
    [Name] NVARCHAR(128) NOT NULL, 
	[Default] [dbo].[Flag] NOT NULL,
    [Description] NVARCHAR(256) NULL, 
    [StreetOne] NVARCHAR(256) NOT NULL, 
    [StreetTwo] NVARCHAR(256) NULL, 
    [City] NVARCHAR(128) NOT NULL, 
    [State] NVARCHAR(2) NOT NULL, 
    [Zip] NVARCHAR(10) NOT NULL
)
