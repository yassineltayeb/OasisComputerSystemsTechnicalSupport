using System;

namespace Oasis.Support.API.Exceptions
{
    public class DuplicateResourceException : Exception
    {
        public DuplicateResourceException(string message) : base(message)
        { }
    }
}
