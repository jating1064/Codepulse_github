﻿using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository blogPostRepository;
        private readonly ICategoryRepository categoryRepository;

        public BlogPostsController(IBlogPostRepository blogPostRepository, 
            ICategoryRepository categoryRepository)
        {
            this.blogPostRepository = blogPostRepository;
            this.categoryRepository = categoryRepository;
        }
        //POST:{apibaseurl}/api/blogposts
        [Authorize(Roles = "Writer")]
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(CreateBlogPostRequestDto request)
        {
            //Convert from Dto to DM
            var blogPost = new BlogPost
            {
                Author = request.Author,
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeaturedImageUrl = request.FeatureImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                IsVisible = request.IsVisible,
                Categories = new List<Category>()
            };

            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await categoryRepository.GetByIdAsync(categoryGuid);
                if(existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            await blogPostRepository.CreateAsync(blogPost);

            //Map DM to DTO
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeatureImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedDate = blogPost.PublishedDate,
                IsVisible = blogPost.IsVisible,
                Categories=blogPost.Categories.Select(x=>new CategoryDto 
                { Id = x.Id,
                Name = x.Name,
                UrlHandle=x.UrlHandle
                }).ToList()
            };

            return Ok(response);

        }

        //GET:{apibaseUrl}/api/blogposts
        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
             var blogPosts= await blogPostRepository.GetAllasync();
            //Map DM to DTO
            var response=new List<BlogPostDto>();
            foreach (var blogPost in blogPosts)
            {
                response.Add(new BlogPostDto
                {
                    Id = blogPost.Id,
                    Author = blogPost.Author,
                    Title = blogPost.Title,
                    ShortDescription = blogPost.ShortDescription,
                    Content = blogPost.Content,
                    FeatureImageUrl = blogPost.FeaturedImageUrl,
                    UrlHandle = blogPost.UrlHandle,
                    PublishedDate = blogPost.PublishedDate,
                    IsVisible = blogPost.IsVisible,
                    Categories = blogPost.Categories.Select(x => new CategoryDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UrlHandle = x.UrlHandle
                    }).ToList()
                });
            }
              return Ok(response);
        }

        //GET:{apibaseUrl}/api/blogPosts/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            //Get the BP from Repsository
            var blogPost= await blogPostRepository.GetByIdAsync(id);
            if(blogPost == null)
            {
                return NotFound();
            }
            //Convert DM to DTO
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeatureImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedDate = blogPost.PublishedDate,
                IsVisible = blogPost.IsVisible,
                Categories = blogPost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }

        //GET:{apibaseUrl}/api/blogPosts/{urlHandle}
        [HttpGet]
        [Route("{urlHandle}")]
        public async Task<IActionResult> GetBlogPostByUrlHandle([FromRoute] string urlHandle)
        {
            //Get the BP from Repsository
            var blogPost = await blogPostRepository.GetByUrlHandleAsync(urlHandle);
            if (blogPost == null)
            {
                return NotFound();
            }
            //Convert DM to DTO
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeatureImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedDate = blogPost.PublishedDate,
                IsVisible = blogPost.IsVisible,
                Categories = blogPost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }

        //PUT:{apibaseUrl}/api/blogPosts/{id}
        [Authorize(Roles = "Writer")]
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateBlogPostById([FromRoute] Guid id, [FromBody] UpdateBlogPostRequestDto request)
        {
            //Convert DTO to DM
            var blogPost = new BlogPost
            {
                Id = id,
                Author = request.Author,
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeaturedImageUrl = request.FeatureImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                IsVisible = request.IsVisible,
                Categories = new List<Category>()
            };
            foreach (var categoryGuid in request.Categories)
            {
                //await categoryRepository.GetByIdAsync(categoryGuid);
                var existingCategory = await categoryRepository.GetByIdAsync(categoryGuid);
                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }
            //let's call repository to update BP DM
            var updatedBlogPost= blogPostRepository.UpdateAsync(blogPost);
            
            if(updatedBlogPost == null) 
            {
                return NotFound();
            }

            //Convert DM to DTO
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeatureImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedDate = blogPost.PublishedDate,
                IsVisible = blogPost.IsVisible,
                Categories = blogPost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };
            return Ok(response);

        }

        //Delete:{apibaseUrl}/api/blogposts/{id}
        [Authorize(Roles = "Writer")]
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
            //Call Repsoitory to Delete Method
            var deletedBP= await blogPostRepository.DeleteAsync(id);
            if(deletedBP == null) 
            {  
                return NotFound();
            }

            //Convert DM to DTO
            var response = new BlogPostDto
            {
                Id = deletedBP.Id,
                Author = deletedBP.Author,
                Title = deletedBP.Title,
                ShortDescription = deletedBP.ShortDescription,
                Content = deletedBP.Content,
                FeatureImageUrl = deletedBP.FeaturedImageUrl,
                UrlHandle = deletedBP.UrlHandle,
                PublishedDate = deletedBP.PublishedDate,
                IsVisible = deletedBP.IsVisible,
            };
            return Ok(response);
        }
    }
}
