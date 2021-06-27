using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Helpers
{
    public static class Files
    {
        private static readonly string uploadPath = "D:\\Personal\\Work\\Systems\\Oasis Computer Systems\\OasisComputerSystems.API\\wwwroot";
        public static async void UploadFiles(int id, ICollection<IFormFile> files)
        {
            var destinationPath = Path.Combine(uploadPath, "Tickets/" + id);

            if (!Directory.Exists(destinationPath))
                Directory.CreateDirectory(destinationPath);

            foreach (var file in files)
            {
                var sourcePath = Path.Combine(destinationPath, file.FileName);

                using (var stream = new FileStream(sourcePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
        }
    }
}
