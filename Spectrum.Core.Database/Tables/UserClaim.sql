﻿CREATE TABLE [dbo].[UserClaim]
(
    [UserId]     INT         NOT NULL,
    [ClaimId]    INT IDENTITY (1,1)    NOT NULL,
    [ClaimType]  NVARCHAR (MAX)        NULL,
    [ClaimValue] NVARCHAR (MAX)        NULL,

    CONSTRAINT [PK_UserClaim_ClaimID] PRIMARY KEY CLUSTERED ([ClaimId] ASC),
    CONSTRAINT [FK_UserClaim_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]) ON DELETE CASCADE
);

GO
CREATE NONCLUSTERED INDEX [IX_UserClaim_UserID]
    ON [dbo].[UserClaim] ([UserId] ASC);