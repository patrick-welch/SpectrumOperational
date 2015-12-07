﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Spectrum.Core.Data.Context.Interfaces;
using Spectrum.Core.Data.Context.UnitOfWork;
using Spectrum.Core.Data.Models;
using Spectrum.Core.Data.Models.Interfaces;
using Spectrum.Core.Data.Repositories;
using Spectrum.Core.Data.Repositories.Interfaces;
using Spectrum.Web.Models;

namespace Spectrum.Web.Controllers.Api
{
    public class UserRolesController : ApiController
    {
        private ICoreDbContext _context;
        private UserRepository _userRepository;
        private readonly UserManager<User, int> _manager;

        public UserRolesController(ICoreUnitOfWork uow)
        {
            _context = uow.Context;

            _userRepository = new UserRepository(uow);
            _manager = new UserManager<User, int>(_userRepository);
        }

        // GET: api/UserRoles/5
        [System.Web.Http.HttpGet]
        public HttpResponseMessage Get(int id)
        {
            var user = _userRepository.FindByIdAsync(id).Result;
            var userRoles = user.UserRoles;

            var userRoleViewModels = new List<RoleViewModel>();

            foreach (var r in userRoles)
            {
                userRoleViewModels.Add(Mapper.Map<RoleViewModel>(r.Role));
            }

            return Request.CreateResponse(HttpStatusCode.OK, userRoleViewModels);
        }


        // PUT: api/Roles/5
        [System.Web.Http.HttpPut]
        public HttpResponseMessage Put([FromBody] UserViewModel editUser)
        {
            var user = _manager.FindById(editUser.Id);

            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            if (editUser.UserRoles.Count > 0)
            {
                foreach (var r in editUser.UserRoles)
                {
                    if (!user.UserRoles.Any(x => x.RoleId == r.RoleId
                            && x.OrganizationId == r.OrganizationId
                            && x.UserId == r.UserId))
                    {
                        var tempUserRole = new UserRole();
                        Mapper.Map(r, tempUserRole);
                        user.UserRoles.Add(tempUserRole);
                    }
                    else
                    {
                        var userRole = user.UserRoles.First(x => x.RoleId == r.RoleId
                                                                 && x.OrganizationId == r.OrganizationId
                                                                 && x.UserId == r.UserId);

                        userRole.ObjectState = ObjectState.Unchanged;
                    }
                }
            }
            else
            {
                foreach (var r in user.UserRoles.ToList())
                {
                    user.UserRoles.Remove(r);
                    r.ObjectState = ObjectState.Deleted;
                }
            }

            user.ObjectState = ObjectState.Modified;

            var result = _manager.Update(user);

            if (result.Succeeded)
            {
                return Request.CreateResponse(HttpStatusCode.Created, user);
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}
