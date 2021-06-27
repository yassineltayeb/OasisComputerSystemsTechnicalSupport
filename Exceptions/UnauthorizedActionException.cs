using System;

namespace Oasis.Support.API.Exceptions
{
    public class UnauthorizedActionException : Exception
    {
        public UnauthorizedActionException(string message) : base(message)
        { }
    }
}
