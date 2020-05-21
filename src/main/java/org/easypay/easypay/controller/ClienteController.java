package org.easypay.easypay.controller;

import io.swagger.annotations.*;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.easypay.easypay.dao.entity.Cliente;
import org.easypay.easypay.dao.entity.Commerciante;
import org.easypay.easypay.dao.exception.NotFoundException;
import org.easypay.easypay.dao.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clienti")
@Api(value = "Client", description = "Client listing")
public class ClienteController implements ErrorHandlingController, SelfHandlingController {

    private static final Logger LOG = Logger.getLogger(ClienteController.class);

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ApiOperation(value = "Retrieve all client")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully retrieved client's list")
        ,
        @ApiResponse(code = 401, message = "You are not authorized to view the resource")
        ,
        @ApiResponse(code = 403, message = "Accessing the client's list is forbidden")
    })
    public ResponseEntity<List<Cliente>> getAll() {
        return ResponseEntity.ok(clientRepository.findAll());
    }

    @PostMapping(value = "",
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ApiOperation(value = "Create a client")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully created user")
        ,
        @ApiResponse(code = 400, message = "Request was incorrect")
        ,
        @ApiResponse(code = 401, message = "You are not authorized to create client")
    })
    public ResponseEntity<Cliente> create(@Valid @RequestBody ClienteCreate cliente) {
        switch (cliente.getType()) {
            case "cliente":
                return ResponseEntity.ok(clientRepository.save(Cliente.builder()
                        .username(cliente.getUsername())
                        .password(passwordEncoder.encode(cliente.getPassword()))
                        .nome(cliente.getNome())
                        .cognome(cliente.getCognome())
                        .cf(cliente.getCf())
                        .build()));
            case "commerciante":
                return ResponseEntity.ok(clientRepository.save(Commerciante.builder()
                        .username(cliente.getUsername())
                        .password(passwordEncoder.encode(cliente.getPassword()))
                        .nome(cliente.getNome())
                        .cognome(cliente.getCognome())
                        .cf(cliente.getCf())
                        .pIva(cliente.getPiva())
                        .ragSoc(cliente.getRagSoc())
                        .build()));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ApiOperation(value = "Retrieve client by id")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully retrieved client")
        ,
        @ApiResponse(code = 401, message = "You are not authorized to view the resource")
        ,
        @ApiResponse(code = 403, message = "Accessing the client is forbidden")
    })
    public ResponseEntity<Cliente> getById(@PathVariable("id") String id) {
        return ResponseEntity.ok(clientRepository.findById(getUserId(id))
                .orElseThrow(() -> new NotFoundException(Cliente.class, "id", id)));
    }

    @PostMapping(value = "/{id}",
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ApiOperation(value = "Edit client by id")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully edited client")
        ,
        @ApiResponse(code = 400, message = "Request was incorrect")
        ,
        @ApiResponse(code = 401, message = "You are not authorized to edit the resource")
        ,
        @ApiResponse(code = 403, message = "Accessing the client is forbidden")
    })
    public ResponseEntity<Cliente> edit(
            @PathVariable("id") String id,
            @Valid @RequestBody ClienteEdit cliente
    ) {
        return ResponseEntity.ok(clientRepository.findById(getUserId(id))
                .map(u -> {
                    u.setNome(cliente.getNome());
                    u.setCognome(cliente.getCognome());
                    u.setCf(cliente.getCf());
                    clientRepository.save(u);
                    return u;
                })
                .orElseThrow(() -> new NotFoundException(Cliente.class, "id", id)));
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ApiOperation(value = "Delete client by id")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully deleted client")
        ,
        @ApiResponse(code = 401, message = "You are not authorized to delete the resource")
        ,
        @ApiResponse(code = 403, message = "Accessing the client is forbidden")
    })
    public ResponseEntity<Cliente> deleteById(@PathVariable("id") String id) {
        return ResponseEntity.ok(clientRepository.findById(getUserId(id))
                .map(u -> {
                    clientRepository.delete(u);
                    return u;
                })
                .orElseThrow(
                        () -> new NotFoundException(Cliente.class, "id", id)));
    }

    @Data
    @AllArgsConstructor
    @RequiredArgsConstructor
    public static class ClienteCreate extends ClienteEdit {

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9]+([.][a-zA-Z0-9]+)?[@]([a-zA-Z]+[.][a-zA-Z]{2,3})", message = "Username must be a valid email address")
        @ApiModelProperty(
                position = 1,
                required = true,
                value = "The login username"
        )
        private String username;

        @NotBlank
        @Pattern.List({
            //            @Pattern(regexp = "(?=.*[0-9])", message = "Password must contain one digit.")
            //            ,
            //            @Pattern(regexp = "(?=.*[a-z])", message = "Password must contain one lowercase letter.")
            //            ,
            //            @Pattern(regexp = "(?=.*[A-Z])", message = "Password must contain one uppercase letter.")
            //            ,
            @Pattern(regexp = "(?=\\S+$)", message = "Password must contain no whitespace.")
            ,
            @Pattern(regexp = "^.{5,}", message = "Password must be at least 5 character long")
        })
        @ApiModelProperty(
                position = 2,
                required = true,
                value = "The login password"
        )
        private String password;

        @NotBlank
        @Pattern(regexp = "^cliente|commerciante$", message = "Valid values are [\"cliente\", \"commerciante\"]")
        @ApiModelProperty(
                position = 3,
                required = true,
                value = "The account type. Valid values are [\"cliente\", \"commerciante\"]"
        )
        private String type;

    }

    @Data
    @AllArgsConstructor
    @RequiredArgsConstructor
    public static class ClienteEdit {

        @NotBlank
        @ApiModelProperty(
                position = 10,
                required = true,
                value = "Client firstname"
        )
        private String nome;

        @NotBlank
        @ApiModelProperty(
                position = 11,
                required = true,
                value = "Client lastname"
        )
        private String cognome;

        @NotBlank
        @ApiModelProperty(
                position = 12,
                required = true,
                value = "Client fiscal code"
        )
        private String cf;

//        @NotBlank
        @ApiModelProperty(
                position = 20,
                required = true,
                value = "VAT number"
        )
        private String piva;

//        @NotBlank
        @ApiModelProperty(
                position = 21,
                required = true,
                value = "Business name"
        )
        private String ragSoc;
    }
}
