///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package org.easypay.easypay.controller;
//
//import java.util.List;
//import javax.validation.Valid;
//import javax.validation.constraints.Min;
//import javax.validation.constraints.NotNull;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.RequiredArgsConstructor;
//import org.easypay.easypay.dao.entity.Commerciante;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
///**
// * Sample controller
// *
// * @author simo
// */
//@Controller
//@RequestMapping("/sample")
//public class SampleController {
//
//    @Autowired
//    private CommercianteRepository userRepository;
//
//    /*
//    Esempio 1: richiesta GET dell'url /sample/test
//     */
//    @RequestMapping(value = "/test",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public @ResponseBody
//    TestObject test() {
//        return TestObject.builder()
//                .name("Test")
//                .x(0)
//                .build();
//    }
//
//    /*
//    Esempio 2: richiesta GET dell'url /sample/test/<x>
//    X rappresenta un parametro che verrà letto grazie all'annotazione @PathVariable
//     */
//    @RequestMapping(value = "/test/{x}",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public @ResponseBody
//    TestObject test2(@PathVariable int x) {
//        return TestObject.builder()
//                .name("Test")
//                .x(x)
//                .build();
//    }
//
//    /*
//    Esempio 3: richiesta GET dell'url /sample/test2?x=<val>
//    il valore <val> del parametro x verrò letto e mappato nel parametro x del metodo
//     */
//    @RequestMapping(value = "/test2",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public @ResponseBody
//    TestObject test3(@RequestParam int x) {
//        return TestObject.builder()
//                .name("Test")
//                .x(x)
//                .build();
//    }
//
//    /*
//    Esempio 4: richiesta GET dell'url /sample/test3?AAA=<x>&name=<name>
//    i valori di AAA e name verranno mappati rispettivamente nei parametri x e name del metodo
//     */
//    @RequestMapping(value = "/test3",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public @ResponseBody
//    TestObject test4(@RequestParam("AAA") int x, @RequestParam("name") String name) {
//        return TestObject.builder()
//                .name(name)
//                .x(x)
//                .build();
//    }
//
//    /*
//    Esempio 4: richiesta GET dell'url /sample/test4?x=<x>&name=<name>
//    i valori di x e name verranno mappati rispettivamente nelle proprietà con lo stesso nome
//    di un oggetto TestObject che verrà passato al metodo. Tale oggetto prima verrà validato
//    in base alle annotazioni presenti sui suoi campi interni, ovvero name non nullo e x >= 0
//     */
//    @RequestMapping(value = "/test4",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public @ResponseBody
//    TestObject echo(@Valid @ModelAttribute TestObject test) {
//        return test;
//    }
//
//    @RequestMapping(value = "/users",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public @ResponseBody
//    List<Commerciante> getUsers() {
//        return userRepository.findAll();
//    }
//
//    @RequestMapping(value = "/adduser",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public String addUser(@Valid @ModelAttribute Commerciante user) {
//        userRepository.save(user);
//        return "redirect:/sample/users";
//    }
//
//    @Data
//    @Builder
//    @RequiredArgsConstructor
//    @AllArgsConstructor
//    public static class TestObject {
//
//        @NotNull
//        private String name;
//        @Min(0)
//        private int x;
//    }
//}
