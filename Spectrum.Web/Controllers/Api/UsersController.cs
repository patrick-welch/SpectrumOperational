using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Spectrum.Data.Core.Context.Interfaces;
using Spectrum.Data.Core.Models;
using Spectrum.Data.Core.Models.Interfaces;
using Spectrum.Data.Core.Repositories.Interfaces;
using Spectrum.Logic.Identity;
using Spectrum.Web.Models;
using Spectrum.Web.IdentityConfig;

namespace Spectrum.Web.Controllers.Api
{
    public class UsersController : ApiController
    {
        private ICoreDbContext _context;
        private IUserStore<User, int> _userRepository;
        private readonly ApplicationUserManager _manager;

        public UsersController(IUserRepository userRepository)
        {
            _context = userRepository.Context;
            _userRepository = userRepository;
            _manager = new ApplicationUserManager(_userRepository, true);
        }

        //TODO: Update all of these with async calls.

        [HttpGet]
        // GET: api/Users
        public IEnumerable<UserViewModel> Get()
        {
            var userViewModels = new List<UserViewModel>();

            foreach (var u in _manager.Users)
            {
                userViewModels.Add(Mapper.Map<UserViewModel>(u));
            }
            
            //TODO: Get Paging working
            return userViewModels;  //.Take(10);
        }

        [HttpGet]
        // GET: api/Users/5
        public HttpResponseMessage Get(int id)
        {
            var user = _manager.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, Mapper.Map<UserViewModel>(user)); 
        }

        [HttpPost]
        // POST: api/Users
        public HttpResponseMessage Post([FromBody]UserViewModel newUser)
        {
            User user = new User();
            Mapper.Map(newUser, user);

            //TODO: Need user password validation here and some feedback
            var result = _manager.Create(user, newUser.Password);

            if (result.Succeeded)
            {
                user.UserOrganizations.Add(new UserOrganization
                {
                    Default = true,
                    ObjectState = ObjectState.Added,
                    OrganizationId = UserUtility.GetUserFromMemoryCache(User).SelectedOrganizationId,
                    UserId = user.Id
                });

                var addResult = _manager.Update(user);
                if (addResult.Succeeded)
                {
                    return Request.CreateResponse(HttpStatusCode.Created, Mapper.Map<UserViewModel>(user));
                }
            }

            //If the user has an existing default organization
            //if (user.UserOrganizations.Any(o => o.Default == true))
            //{ }

            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        [HttpPut]
        // PUT: api/Users/5
        public HttpResponseMessage Put(int id, [FromBody]UserViewModel editUser)
        {
            var user = _manager.FindById(editUser.Id);
            var hasher = new PasswordHasher();

            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            //TODO: Need user password validation here and some feedback
            if (editUser.Password != null && editUser.ConfirmPassword != null &&
                editUser.Password == editUser.ConfirmPassword)
            {
                user.PasswordHash = hasher.HashPassword(editUser.Password);
            }

            user.UserName = editUser.UserName;
            user.Email = editUser.Email;
            user.ObjectState = ObjectState.Modified;

            var result = _manager.Update(user);

            if (result.Succeeded)
            {
                return Request.CreateResponse(HttpStatusCode.Created,
                    Mapper.Map<UserViewModel>(user));
            }
            
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        [HttpDelete]
        // DELETE: api/Users/5
        public HttpResponseMessage Delete(int id)
        {
            User user = _manager.FindById(id);

            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            user.ObjectState = ObjectState.Deleted;
            var result = _manager.Delete(user);

            if (result.Succeeded)
            {
                return Request.CreateResponse(HttpStatusCode.OK, Mapper.Map<UserViewModel>(user));
            }

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
