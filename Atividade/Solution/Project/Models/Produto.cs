using System;

namespace Project.Models
{
    public class Produto
    {
        public Produto()
        {
            Id = Guid.NewGuid().ToString();
            CriadoEm = DateTime.Now;
        }

        public string Nome { get; set; }
        public string Id { get; set; }
        public int Quantidade { get; set; }
        public double Preco { get; set; }
        public DateTime CriadoEm { get; set; }
    }
}
