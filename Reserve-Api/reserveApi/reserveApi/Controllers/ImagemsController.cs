using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSV2.Data;
using RSV2.Models;

namespace RSV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagemsController : ControllerBase
    {
        private readonly DataContext _context;

        public ImagemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Imagems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Imagem>>> GetImagems()
        {
          if (_context.Imagems == null)
          {
              return NotFound();
          }
            return await _context.Imagems.ToListAsync();
        }

        // GET: api/Imagems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Imagem>>> GetImagem(int id)
        {
            if (_context.Imagems == null)
            {
                return NotFound();
            }

            return await _context.Imagems.Where(im => im.Id_Quadra == id).ToListAsync();
        }

        // PUT: api/Imagems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImagem(int id, Imagem imagem)
        {
            if (id != imagem.Id)
            {
                return BadRequest();
            }

            _context.Entry(imagem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImagemExists(id))
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

        // POST: api/Imagems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Imagem>> PostImagem(Imagem imagem)
        {
          if (_context.Imagems == null)
          {
              return Problem("Entity set 'DataContext.Imagems'  is null.");
          }
            _context.Imagems.Add(imagem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImagem", new { id = imagem.Id }, imagem);
        }

        // DELETE: api/Imagems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImagem(int id)
        {
            if (_context.Imagems == null)
            {
                return NotFound();
            }
            var imagem = await _context.Imagems.FindAsync(id);
            if (imagem == null)
            {
                return NotFound();
            }

            _context.Imagems.Remove(imagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImagemExists(int id)
        {
            return (_context.Imagems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
