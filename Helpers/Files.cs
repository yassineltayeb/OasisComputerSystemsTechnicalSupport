using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Oasis.TechnicalSupport.Web.Models;
using System.Collections.Generic;
using System.IO;
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
        public static async Task<List<FileModel>> DownloadFiles(int id)
        {
            var destinationPath = Path.Combine(uploadPath, "Tickets/" + id);

            if (!Directory.Exists(destinationPath))
                return null;

            string[] filepaths = Directory.GetFiles(destinationPath);

            List<FileModel> list = new List<FileModel>();
            foreach (string filepath in filepaths)
            {
                list.Add(new FileModel
                {
                    FileName = Path.GetFileName(filepath),
                    Type = Path.GetExtension(filepath),
                    Size = new FileInfo(filepath).Length
                });
            }
            return await Task.Run(() => list);

        }

        public static async Task<byte[]> DownloadFile(int id, string filename)
        {
            var destinationPath = Path.Combine(uploadPath, "Tickets\\"  + id, filename);
            // var path = Path.Combine(destinationPath, "\\", filename);
            return await Task.Run(() => System.IO.File.ReadAllBytes(destinationPath));
        }
    }
}
