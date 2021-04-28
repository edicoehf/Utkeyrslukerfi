using System.ComponentModel.DataAnnotations;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class DeliveriesInputModel
    {
        public DeliveryInputModel[] Deliveries { get; set; }
        
    }
}