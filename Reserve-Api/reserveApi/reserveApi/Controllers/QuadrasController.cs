using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using RSV2.Data;
using RSV2.Models;

namespace RSV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuadrasController : ControllerBase
    {
        private readonly DataContext _context;

        public QuadrasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Quadras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quadra>>> GetQuadras([FromQuery]QuadraSearch search)
        {
          if (_context.Quadras == null)
          {
              return NotFound();
          }

          if (search.Cidade != null)
          {
            return await _context.Quadras.Where(q => q.Cidade.ToUpper() == search.Cidade.ToUpper()).ToListAsync();
          }

          if (search.Estado != null)
          {
            return await _context.Quadras.Where(q => q.Cidade.ToUpper() == search.Estado.ToUpper()).ToListAsync();
          }

          if (search.Tipo != null)
          {
            return await _context.Quadras.Where(q => q.Tipo == search.Tipo).ToListAsync();
          }

          if (search.Items != null)
          {
            return await _context.Quadras.Where(q => q.Items.ToUpper().Contains(search.Items.ToUpper())).ToListAsync();
          }

            if (search.PrecoMinimo != null && search.PrecoMaximo != null)
            {
                return await _context.Quadras.Where(q => q.PrecoHora >= search.PrecoMinimo && q.PrecoHora <= search.PrecoMaximo).ToListAsync();
            }

            if (search.PrecoMinimo != null)
          {
             return await _context.Quadras.Where(q => q.PrecoHora >= search.PrecoMinimo).ToListAsync();
          }

          if (search.PrecoMaximo != null)
          {
              return await _context.Quadras.Where(q => q.PrecoHora <= search.PrecoMaximo).ToListAsync();
          }

            if (search.Texto != null)
            {
                var quadraList = await _context.Quadras.ToListAsync();
                var filterByTipo = quadraList.Where(q => ToStringEnums((TipoQuadraEnum)q.Tipo).Contains(search.Texto.ToUpper())).ToList();
                if (filterByTipo.Any())
                {
                    return filterByTipo;
                }
                else
                {
                    return quadraList
                    .Where(q => q.Items.ToUpper().Contains(search.Texto.ToUpper()) ||
                            q.Cidade.ToUpper().Contains(search.Texto.ToUpper()) ||
                            q.Descricao.ToUpper().Contains(search.Texto.ToUpper()) ||
                            q.Endereco.ToUpper().Contains(search.Texto.ToUpper()))
                    .ToList();
                }
            }

            return await _context.Quadras.ToListAsync();
        }

        // GET: api/Quadras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quadra>> GetQuadra(int id)
        {
          if (_context.Quadras == null)
          {
              return NotFound();
          }
            var quadra = await _context.Quadras.FindAsync(id);

            if (quadra == null)
            {
                return NotFound();
            }

            return quadra;
        }

        // PUT: api/Quadras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuadra(int id, Quadra quadra)
        {
            if (id != quadra.Id)
            {
                return BadRequest();
            }

            _context.Entry(quadra).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuadraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Quadras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quadra>> PostQuadra(Quadra quadra)
        {
          if (_context.Quadras == null)
          {
              return Problem("Entity set 'DataContext.Quadras'  is null.");
          }
            _context.Quadras.Add(quadra);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuadra", new { id = quadra.Id }, quadra);
        }

        // DELETE: api/Quadras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuadra(int id)
        {
            if (_context.Quadras == null)
            {
                return NotFound();
            }
            var quadra = await _context.Quadras.FindAsync(id);
            if (quadra == null)
            {
                return NotFound();
            }

            _context.Quadras.Remove(quadra);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuadraExists(int id)
        {
            return (_context.Quadras?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public static string ToStringEnums(Enum en)
        {
            Type type = en.GetType();

            MemberInfo[] memInfo = type.GetMember(en.ToString());
            if (memInfo != null && memInfo.Length > 0)
            {
                object[] attrs = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (attrs != null && attrs.Length > 0)
                    return (((DescriptionAttribute)attrs[0]).Description).ToString().ToUpper();
            }
            return en.ToString();
        }
    }
}
