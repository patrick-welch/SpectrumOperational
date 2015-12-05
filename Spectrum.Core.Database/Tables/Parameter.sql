﻿CREATE TABLE [dbo].[Parameter]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1000, 1), 
    [Key] NVARCHAR(128) NOT NULL, 
    [Value] NVARCHAR(128) NOT NULL,
    [Cloaked]			   BIT					  NULL, 
    [Archive]			   BIT					  NULL, 
    [CreatedDate]		   DATETIME				  NULL,
	[CreatedByUserId]	   INT					  NULL,
    [ModifiedDate]		   DATETIME				  NULL, 
	[ModifiedByUserId]	   INT					  NULL
)
