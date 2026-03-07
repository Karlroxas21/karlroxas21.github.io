# Spring Boot DI: Stop Wiring Everything Yourself

###### _Karl Marx Roxas January 30, 2026_

## What's This About?

Imagine you're building a house. You could cut every piece of lumber yourself, mix your own concrete, and forge your own nails. Or you could just tell the contractor "I need a kitchen here" and they figure out the plumbing, electrical, and materials.

That's what Spring Boot's **Dependency Injection (DI)** does for your Java application. Instead of you manually creating every object, connecting them together, and managing their lifecycles, Spring Boot does it for you. You just say "I need this" and it shows up, ready to use.

If you've ever written a backend app where you manually created service objects inside controllers, passed database connections around, or had a massive `main()` method that wired everything together — Spring Boot's auto DI is the cure.

---

## The Pain: Doing It Yourself

### Manual Wiring — The Old Way

Let's say you're building an e-commerce app. You've got a controller that handles HTTP requests, a service that has the business logic, and a repository that talks to the database.

Without DI, you'd write something like this:

```java
// You create everything manually
public class Main {
    public static void main(String[] args) {
        // Step 1: Create the database connection
        DataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://localhost:5432/shop");
        dataSource.setUsername("admin");
        dataSource.setPassword("secret");

        // Step 2: Create the repository, give it the connection
        ProductRepository productRepo = new ProductRepository(dataSource);
        OrderRepository orderRepo = new OrderRepository(dataSource);

        // Step 3: Create the services, give them the repositories
        ProductService productService = new ProductService(productRepo);
        OrderService orderService = new OrderService(orderRepo, productService);

        // Step 4: Create the controllers, give them the services
        ProductController productController = new ProductController(productService);
        OrderController orderController = new OrderController(orderService);

        // Step 5: Set up the server and register routes
        Server server = new Server(8080);
        server.register("/products", productController);
        server.register("/orders", orderController);
        server.start();
    }
}
```

### Why This Hurts

**1. The `main()` method knows about everything.**
It has to know about the database, every repository, every service, every controller. Add a new feature? Come back here and add more wiring.

**2. The order matters.**
You can't create `OrderService` before `ProductService` because it depends on it. You can't create `ProductService` before `ProductRepository`. You have to think about the construction order yourself. In a big app with 50+ classes, this becomes a puzzle.

**3. Adding a new dependency means changing multiple files.**
Say `OrderService` now needs an `EmailService` to send confirmation emails. You need to:

- Create the `EmailService` in `main()`
- Update `OrderService`'s constructor
- Pass `EmailService` into `OrderService` in `main()`

Three changes for one addition.

**4. Testing is painful.**
Want to test `OrderService` without a real database? You have to manually create mock versions of every dependency and pass them in by hand.

**5. There's only one of everything (or is there?).**
Should `DataSource` be shared? Should there be one `ProductService` or a new one per request? You have to manage all of that yourself.

---

## The Fix: Spring Boot Auto DI

Spring Boot flips the whole thing around. Instead of you creating objects and plugging them together, you just **mark your classes** with annotations and Spring builds everything for you.

Here's the same app with Spring Boot:

```java
@Repository
public class ProductRepository {
    // Spring gives you the database connection automatically
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Product> findAll() {
        return jdbcTemplate.query("SELECT * FROM products", new ProductRowMapper());
    }
}
```

```java
@Service
public class ProductService {
    // Spring sees this and automatically plugs in ProductRepository
    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }
}
```

```java
@RestController
@RequestMapping("/products")
public class ProductController {
    // Spring plugs in ProductService automatically
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }
}
```

That's it. No `main()` method full of wiring. No manual construction. No worrying about the order. Spring Boot scans your code, sees the annotations, figures out what depends on what, creates everything in the right order, and plugs it all together.

### What Just Happened?

1. Spring Boot starts and scans your project for classes with annotations like `@Repository`, `@Service`, `@RestController`
2. It creates a single instance of each one (called a **bean**)
3. It looks at each constructor and says "this needs a `ProductRepository`? I made one of those. Let me plug it in."
4. It does this for every class, building the whole chain: database → repository → service → controller
5. It registers the controller's routes with the embedded web server
6. Everything is ready to handle requests

You didn't wire anything. You just described what each class needs, and Spring figured out the rest.

---

## How It Makes You Faster

### 1. Add a New Feature in Minutes

Want to add an email notification to orders? Just create the service:

```java
@Service
public class EmailService {
    public void sendOrderConfirmation(String email, Order order) {
        // send the email
    }
}
```

And use it where you need it:

```java
@Service
public class OrderService {
    private final OrderRepository orderRepo;
    private final ProductService productService;
    private final EmailService emailService; // just add it

    // Spring sees the new parameter and plugs in EmailService
    public OrderService(
        OrderRepository orderRepo,
        ProductService productService,
        EmailService emailService
    ) {
        this.orderRepo = orderRepo;
        this.productService = productService;
        this.emailService = emailService;
    }

    public Order placeOrder(OrderRequest request) {
        Order order = orderRepo.save(buildOrder(request));
        emailService.sendOrderConfirmation(request.getEmail(), order);
        return order;
    }
}
```

No wiring file to update. No factory method to change. You just created a class with `@Service` and added it as a constructor parameter. Spring handles the rest.

### 2. Testing Becomes Easy

Because dependencies are injected through the constructor, you can swap them out with test doubles:

```java
@SpringBootTest
class OrderServiceTest {
    @MockBean
    private OrderRepository orderRepo;

    @MockBean
    private ProductService productService;

    @MockBean
    private EmailService emailService;

    @Autowired
    private OrderService orderService;

    @Test
    void shouldSendEmailWhenOrderIsPlaced() {
        // set up test data
        when(orderRepo.save(any())).thenReturn(testOrder);

        orderService.placeOrder(testRequest);

        // check that the email was sent
        verify(emailService).sendOrderConfirmation(eq("test@email.com"), any());
    }
}
```

`@MockBean` tells Spring "don't use the real one, use this fake version instead." You test just the logic, not the database or email server.

### 3. Configuration is Automatic

Spring Boot auto-configures tons of stuff based on what's on your classpath. Add a PostgreSQL driver to your dependencies? Spring Boot automatically sets up a `DataSource`, a `JdbcTemplate`, and connection pooling. Add Spring Data JPA? It creates your repository implementations for you. You just write the interface:

```java
// Spring generates the ENTIRE implementation of this at startup
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByPriceLessThan(BigDecimal price);
    Optional<Product> findByNameIgnoreCase(String name);
}
```

You wrote an interface with method names. Spring wrote the SQL queries, the connection handling, the result mapping — everything. That's how fast you move with Spring Boot.

---

## The Most Used Annotations — Your Toolbox

### The Big Three: Marking Your Classes

These tell Spring "this is a bean, manage it for me":

#### `@Component`

The base annotation. Makes any class a Spring-managed bean.

```java
@Component
public class PdfGenerator {
    public byte[] generateInvoice(Order order) {
        // generate PDF
    }
}
```

Use `@Component` when your class doesn't fit into controller, service, or repository categories. Think: utility classes, helpers, adapters.

#### `@Service`

Same as `@Component`, but signals "this class holds business logic." It's basically `@Component` with a more descriptive name.

```java
@Service
public class PricingService {
    public BigDecimal calculateDiscount(Customer customer, Cart cart) {
        if (customer.isVip()) {
            return cart.getTotal().multiply(new BigDecimal("0.15"));
        }
        return BigDecimal.ZERO;
    }
}
```

#### `@Repository`

Same as `@Component`, but signals "this class talks to the database." Spring also adds automatic exception translation — database-specific errors get converted to Spring's standard exceptions.

```java
@Repository
public class CustomerRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<Customer> findByEmail(String email) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM customers WHERE email = ?",
            new CustomerRowMapper(),
            email
        );
    }
}
```

**Which one should you use?** Think of them as labels:

- `@Repository` = talks to the database
- `@Service` = has business logic
- `@Component` = anything else that Spring needs to manage

They all do the same thing under the hood (register the class as a bean), but the label helps other developers understand what the class does at a glance.

---

### Web Layer Annotations

#### `@RestController`

Combines `@Controller` and `@ResponseBody`. Every method's return value automatically becomes JSON.

```java
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getAll() {
        return customerService.findAll(); // returns JSON automatically
    }

    @GetMapping("/{id}")
    public Customer getById(@PathVariable Long id) {
        return customerService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Customer create(@RequestBody @Valid CreateCustomerRequest request) {
        return customerService.create(request);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id, @RequestBody @Valid UpdateCustomerRequest request) {
        return customerService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        customerService.delete(id);
    }
}
```

#### `@RequestMapping`

Sets a base URL path for all methods in the controller. You can also use it on individual methods, but most people prefer the shorthand annotations below.

#### `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping`

Shortcuts for mapping HTTP methods to Java methods:

```java
@GetMapping("/search")          // GET /api/customers/search
@PostMapping                    // POST /api/customers
@PutMapping("/{id}")            // PUT /api/customers/123
@DeleteMapping("/{id}")         // DELETE /api/customers/123
@PatchMapping("/{id}/status")   // PATCH /api/customers/123/status
```

#### `@PathVariable`

Grabs a value from the URL:

```java
// GET /api/products/42
@GetMapping("/{id}")
public Product getProduct(@PathVariable Long id) {
    // id = 42
    return productService.findById(id);
}
```

#### `@RequestParam`

Grabs a value from the query string:

```java
// GET /api/products?category=electronics&minPrice=100
@GetMapping
public List<Product> search(
    @RequestParam String category,
    @RequestParam(defaultValue = "0") BigDecimal minPrice,
    @RequestParam(required = false) String brand
) {
    return productService.search(category, minPrice, brand);
}
```

#### `@RequestBody`

Takes the JSON body of a request and turns it into a Java object:

```java
// POST /api/orders with JSON body
@PostMapping
public Order placeOrder(@RequestBody @Valid OrderRequest request) {
    // Spring automatically converts the JSON into an OrderRequest object
    return orderService.placeOrder(request);
}
```

#### `@ResponseStatus`

Sets the HTTP status code for the response:

```java
@PostMapping
@ResponseStatus(HttpStatus.CREATED)  // returns 201 instead of 200
public Product create(@RequestBody ProductRequest request) {
    return productService.create(request);
}

@DeleteMapping("/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)  // returns 204
public void delete(@PathVariable Long id) {
    productService.delete(id);
}
```

---

### Injection Annotations

#### `@Autowired`

Tells Spring "inject the dependency here." You can use it on constructors, fields, or setter methods.

```java
// Field injection (works but not recommended)
@Service
public class NotificationService {
    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;
}

// Constructor injection (recommended — easier to test, makes dependencies obvious)
@Service
public class NotificationService {
    private final EmailService emailService;
    private final SmsService smsService;

    // If there's only one constructor, @Autowired is optional —
    // Spring uses it automatically
    public NotificationService(EmailService emailService, SmsService smsService) {
        this.emailService = emailService;
        this.smsService = smsService;
    }
}
```

**Why constructor injection is better:**

- You can make fields `final` (they can't be changed after creation)
- All dependencies are visible in one place
- You can test the class by just calling `new NotificationService(mockEmail, mockSms)`
- If you have too many parameters, it's a sign the class does too much

#### `@Qualifier`

When Spring finds two beans of the same type, it doesn't know which one to inject. `@Qualifier` tells it which one to pick:

```java
@Component("emailNotifier")
public class EmailNotifier implements Notifier {
    public void send(String message) { /* send email */ }
}

@Component("smsNotifier")
public class SmsNotifier implements Notifier {
    public void send(String message) { /* send SMS */ }
}

@Service
public class AlertService {
    private final Notifier notifier;

    // "Hey Spring, use the email one"
    public AlertService(@Qualifier("emailNotifier") Notifier notifier) {
        this.notifier = notifier;
    }
}
```

#### `@Value`

Injects values from your `application.properties` or `application.yml` file:

```properties
# application.properties
app.name=MyShop
app.max-upload-size=10485760
app.feature.dark-mode=true
```

```java
@Service
public class AppConfigService {
    @Value("${app.name}")
    private String appName;

    @Value("${app.max-upload-size}")
    private long maxUploadSize;

    @Value("${app.feature.dark-mode:false}")  // default value after the colon
    private boolean darkModeEnabled;
}
```

---

### Configuration Annotations

#### `@Configuration`

Marks a class as a source of bean definitions. Use this when you need to create beans with custom setup logic — things that can't just be annotated with `@Component`.

```java
@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate template = new RestTemplate();
        template.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        return template;
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper;
    }
}
```

#### `@Bean`

Used inside `@Configuration` classes. The method's return value becomes a Spring bean. The method name becomes the bean's name.

```java
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("https://myapp.com");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

Think of `@Bean` as saying "I'll build this one by hand, but Spring should still manage it and inject it wherever it's needed."

#### `@ConfigurationProperties`

Maps a whole group of properties to a Java object. Cleaner than a bunch of `@Value` annotations:

```properties
# application.properties
mail.host=smtp.gmail.com
mail.port=587
mail.username=app@gmail.com
mail.password=secret
mail.from=noreply@myapp.com
```

```java
@ConfigurationProperties(prefix = "mail")
public class MailProperties {
    private String host;
    private int port;
    private String username;
    private String password;
    private String from;

    // getters and setters
}
```

```java
@Service
public class EmailService {
    private final MailProperties mailProperties;

    public EmailService(MailProperties mailProperties) {
        this.mailProperties = mailProperties;
        // mailProperties.getHost() → "smtp.gmail.com"
        // mailProperties.getPort() → 587
    }
}
```

#### `@Profile`

Activates a bean only in certain environments:

```java
@Service
@Profile("dev")
public class MockPaymentService implements PaymentService {
    public PaymentResult charge(BigDecimal amount) {
        // always succeeds in dev — no real charges
        return PaymentResult.success("mock-transaction-123");
    }
}

@Service
@Profile("prod")
public class StripePaymentService implements PaymentService {
    public PaymentResult charge(BigDecimal amount) {
        // actually charges the credit card
        return stripe.charges().create(amount);
    }
}
```

Set the active profile in `application.properties`:

```properties
spring.profiles.active=dev
```

Now in development, Spring uses `MockPaymentService`. In production, it uses `StripePaymentService`. Same code, different behavior, zero if-statements.

---

### Validation Annotations

#### `@Valid`

Tells Spring to validate the object before using it:

```java
@PostMapping
public Customer create(@RequestBody @Valid CreateCustomerRequest request) {
    // This method only runs if validation passes
    return customerService.create(request);
}
```

You put the validation rules on the request class:

```java
public class CreateCustomerRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Must be a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @Min(value = 18, message = "Must be at least 18")
    private int age;

    @Size(min = 8, max = 100, message = "Password must be 8-100 characters")
    @NotBlank
    private String password;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number")
    private String phone;

    // getters and setters
}
```

If validation fails, Spring automatically returns a 400 error with the validation messages. You didn't write a single if-statement to check any of this.

---

### Lifecycle & Scope Annotations

#### `@PostConstruct` and `@PreDestroy`

Run code right after a bean is created or right before it's destroyed:

```java
@Service
public class CacheService {
    private Map<String, Object> cache;

    @PostConstruct
    public void init() {
        // runs once after Spring creates this bean
        cache = new ConcurrentHashMap<>();
        loadInitialData();
        log.info("Cache initialized with {} entries", cache.size());
    }

    @PreDestroy
    public void cleanup() {
        // runs when the app is shutting down
        cache.clear();
        log.info("Cache cleared");
    }
}
```

#### `@Scope`

Controls how many instances Spring creates:

```java
// Default — one instance shared across the whole app
@Service
@Scope("singleton")
public class ProductService { }

// New instance for every HTTP request
@Component
@Scope("request")
public class RequestContext { }

// New instance every time someone asks for it
@Component
@Scope("prototype")
public class ReportGenerator { }
```

Most of the time, the default `singleton` scope is what you want. One `ProductService` for the whole app — it's stateless anyway, so sharing is fine.

---

### Exception Handling Annotations

#### `@ExceptionHandler`

Catches exceptions thrown by your controller methods and turns them into clean error responses:

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @ExceptionHandler(ProductNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ProductNotFoundException ex) {
        return new ErrorResponse("Product not found", ex.getMessage());
    }
}
```

#### `@ControllerAdvice` / `@RestControllerAdvice`

Like `@ExceptionHandler` but works across ALL controllers. One class to handle every error in your entire app:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse("Not Found", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationError(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .toList();

        return new ErrorResponse("Validation Failed", errors.toString());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleEverythingElse(Exception ex) {
        log.error("Unexpected error", ex);
        return new ErrorResponse("Internal Error", "Something went wrong");
    }
}
```

---

### Scheduling & Async Annotations

#### `@Scheduled`

Run a method on a timer — no external cron job needed:

```java
@Service
public class CleanupService {

    // Run every hour
    @Scheduled(fixedRate = 3600000)
    public void cleanExpiredSessions() {
        sessionRepo.deleteExpired();
    }

    // Run at midnight every day
    @Scheduled(cron = "0 0 0 * * *")
    public void generateDailyReport() {
        reportService.generateAndEmail();
    }

    // Run 5 minutes after the last run finished
    @Scheduled(fixedDelay = 300000)
    public void syncInventory() {
        inventoryService.syncWithWarehouse();
    }
}
```

Don't forget to enable scheduling on your main class:

```java
@SpringBootApplication
@EnableScheduling
public class MyApp { }
```

#### `@Async`

Run a method in a background thread so it doesn't block the caller:

```java
@Service
public class EmailService {

    @Async
    public void sendWelcomeEmail(String email) {
        // This runs in a separate thread
        // The caller doesn't wait for it to finish
        buildAndSendEmail(email);
    }
}
```

Enable it:

```java
@SpringBootApplication
@EnableAsync
public class MyApp { }
```

---

### Data / JPA Annotations

#### `@Entity`

Marks a class as a database table:

```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private Category category;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // getters and setters
}
```

#### `@Transactional`

Wraps a method in a database transaction. If anything throws an exception, all changes get rolled back:

```java
@Service
public class OrderService {

    @Transactional
    public Order placeOrder(OrderRequest request) {
        // All three of these happen in ONE transaction.
        // If the email fails, the inventory and order changes are rolled back.
        Order order = orderRepo.save(buildOrder(request));
        inventoryService.decreaseStock(request.getItems());
        emailService.sendConfirmation(order);
        return order;
    }
}
```

---

## Quick Reference — Annotation Cheat Sheet

| Annotation                            | What It Does                                      | Where You Use It               |
| ------------------------------------- | ------------------------------------------------- | ------------------------------ |
| `@SpringBootApplication`              | Starts everything — scanning, auto-config, server | Main class                     |
| `@Component`                          | "Spring, manage this class"                       | Any class                      |
| `@Service`                            | Same as @Component, means "business logic"        | Service classes                |
| `@Repository`                         | Same as @Component, means "database access"       | Data access classes            |
| `@RestController`                     | "This class handles HTTP requests, return JSON"   | Controller classes             |
| `@RequestMapping`                     | Base URL path for a controller                    | Controller class or method     |
| `@GetMapping` / `@PostMapping` / etc. | Map HTTP method to a Java method                  | Controller methods             |
| `@PathVariable`                       | Grab value from URL path                          | Method parameter               |
| `@RequestParam`                       | Grab value from query string                      | Method parameter               |
| `@RequestBody`                        | Convert JSON body to Java object                  | Method parameter               |
| `@ResponseStatus`                     | Set the HTTP status code                          | Controller methods             |
| `@Autowired`                          | "Inject the dependency here"                      | Constructor, field, or setter  |
| `@Qualifier`                          | "Use THIS specific bean"                          | Constructor parameter or field |
| `@Value`                              | Inject a config property value                    | Field                          |
| `@Configuration`                      | "This class defines beans"                        | Config classes                 |
| `@Bean`                               | "This method creates a bean"                      | Methods inside @Configuration  |
| `@ConfigurationProperties`            | Map a group of config values to an object         | Config classes                 |
| `@Profile`                            | Only activate in certain environments             | Any bean class                 |
| `@Valid`                              | Validate the object                               | Method parameter               |
| `@Transactional`                      | Wrap in a database transaction                    | Service methods                |
| `@Scheduled`                          | Run on a timer                                    | Service methods                |
| `@Async`                              | Run in a background thread                        | Service methods                |
| `@ExceptionHandler`                   | Handle a specific exception                       | Controller methods             |
| `@RestControllerAdvice`               | Global exception handling                         | Dedicated error handler class  |
| `@PostConstruct`                      | Run after bean is created                         | Any bean method                |
| `@Scope`                              | Control how many instances exist                  | Any bean class                 |
| `@Entity`                             | This class is a database table                    | JPA model classes              |

---

## Before vs. After — The Big Picture

| Thing                    | Manual Wiring                                               | Spring Boot DI                                                    |
| ------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| Creating objects         | You call `new` for everything                               | Spring creates them for you                                       |
| Connecting dependencies  | You pass them through constructors manually                 | Spring reads your constructors and plugs them in                  |
| Construction order       | You figure it out                                           | Spring figures it out                                             |
| Adding a new dependency  | Change the factory/main, change the constructor, pass it in | Just add it to the constructor                                    |
| Swapping implementations | Change every `new` call                                     | Use `@Profile` or `@Qualifier`                                    |
| Configuration            | Hardcoded or hand-parsed                                    | `application.properties` + `@Value` or `@ConfigurationProperties` |
| HTTP routing             | Manual route registration                                   | `@GetMapping("/path")`                                            |
| Validation               | If-statements everywhere                                    | `@Valid` + annotations on the request class                       |
| Error handling           | Try-catch in every controller method                        | `@RestControllerAdvice` — one class handles all errors            |
| Scheduled tasks          | External cron, separate scripts                             | `@Scheduled` — it's just a method                                 |
| Testing                  | Build mock chains by hand                                   | `@MockBean` — one annotation                                      |

---

## Wrapping Up

Spring Boot's auto DI is the thing that lets Java developers move fast. Instead of spending time wiring objects together, managing lifecycles, and writing boilerplate, you spend time on the actual business logic.

The pattern is always the same:

1. Mark your class with an annotation (`@Service`, `@Repository`, `@RestController`)
2. Declare what you need in the constructor
3. Spring handles the rest

That's it. No factory classes. No DI container configuration files. No XML (thank god). Just annotations and constructors.

The first time it clicks — when you add a constructor parameter and it just works without you wiring anything — it feels like magic. But it's not magic. It's Spring scanning your code, building a dependency graph, and constructing everything in the right order. You just stopped doing the boring part yourself.

---

_Links:_

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Dependency Injection Guide](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)
- [Baeldung — Spring DI](https://www.baeldung.com/spring-dependency-injection)
