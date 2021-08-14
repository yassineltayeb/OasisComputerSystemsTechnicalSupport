using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Helpers
{
    /* -------------------------------------------------------------------------- */
    /*                                Files Helper                                */
    /* -------------------------------------------------------------------------- */

    public static class Files
    {
        /* -------------------------------------------------------------------------- */
        /*                                  Variables                                 */
        /* -------------------------------------------------------------------------- */

        private static readonly string uploadPath = "D:\\Personal\\Work\\Systems\\Oasis Computer Systems\\OasisComputerSystems.API\\wwwroot";

        /* ------------------------------ Upload Files ------------------------------ */
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

        /* ----------------------------- Download Files ----------------------------- */
        public static async Task<List<IFormFile>> DownloadFiles(int id)
        {
            var destinationPath = Path.Combine(uploadPath, "Tickets/" + id);

            if (!Directory.Exists(destinationPath))
                return null;

            var files = Directory.GetFiles(destinationPath);

            var Attachments = new List<IFormFile>();

            foreach (var file in files)
            {
                using (var stream = System.IO.File.OpenRead(file))
                {
                    var fileStream = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(stream.Name));
                    Attachments.Add(fileStream);
                }
            }

            return await Task.Run(() => Attachments);

        }
    }
}
