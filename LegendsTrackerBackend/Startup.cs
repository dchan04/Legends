using LegendsTrackerBackend.Data;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using Hangfire;
using Hangfire.Storage.SQLite;
using LegendsTrackerBackend.Services;

namespace LegendsTrackerBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHangfire(configuration => configuration
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UseSQLiteStorage("./Data/AppDb.db"));
            services.AddHangfireServer();
            services.AddScoped<IRiotDataService, RiotDataService>();
            services.AddLogging();
            services.AddCors(options =>
            {
                options.AddPolicy("CORSPolicy", configurePolicy: builder =>
                {
                    builder.AllowAnyMethod().AllowAnyHeader().WithOrigins(origins: "https://localhost:3000");
                });
            });
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(setupAction: swaggerGenOptions =>
            {
                swaggerGenOptions.SwaggerDoc(name: "v1", info: new OpenApiInfo { Title = "Web API for Legends application", Version = "v1" });
            }
            );
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IRecurringJobManager recurringJobManager, IServiceProvider serviceProvider)
        {
            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(setupAction: SwaggerUIOptions =>
                {
                    SwaggerUIOptions.DocumentTitle = "Legends Tracker v1";
                    SwaggerUIOptions.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "Web API for retrieving little legends");
                    SwaggerUIOptions.RoutePrefix = string.Empty;
                });
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseCors(policyName: "CORSPolicy");
            app.UseRouting();
            app.UseEndpoints(endpoint =>
            {
                endpoint.MapGet("get-all-legends", handler: async () => await LegendsRepository.GetLegendsAsync()).WithName("Legends endpoint");
            });

            BackgroundJob.Enqueue(() => serviceProvider.GetService<IRiotDataService>()!.GetApiData());
            app.UseHangfireDashboard();
        }
    }
}
