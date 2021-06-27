using System;

namespace Oasis.Support.API.Exceptions
{
    public class ResourceNotFoundException : Exception
    {
        public ResourceNotFoundException(string message) : base(message)
        { }
    }
}
