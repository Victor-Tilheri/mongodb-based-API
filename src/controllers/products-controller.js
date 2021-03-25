'use strict';

const mongoose = require('mongoose');
const Product = require('../models/Product')

exports.get = (req, res, next) => {
    Product
        .find({ 
            active: true 
        }, 'title description price slug tags')
        .then(data =>{
            res.status(200).send(data);
        }).catch(err => {
            res.status(404).send({ 
                data: err.message
            });
        });;
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({ 
            active: true, 
            slug: req.params.slug 
        }, 'title description price slug tags')
        .then(data =>{
            res.status(200).send(data);
        }).catch(err => {
            res.status(404).send({ 
                data: err.message
            });
        });;
}

exports.getByTag = (req, res, next) => {
    Product
        .find({ 
            active: true, 
            tags: req.params.tag
        }, 'title description price slug tags')
        .then(data =>{
            res.status(200).send(data);
        }).catch(err => {
            res.status(404).send({ 
                data: err.message
            });
        });;
}

exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product
        .save()
        .then(data =>{
            res.status(201).send({ 
                message: "Produto cadastrado com sucesso!" 
            });
        }).catch(err => {
            res.status(400).send({ 
                message: "Falha ao cadastrar o produto!", 
                data: err.message
            });
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(data =>{
            res.status(200).send({ 
                message: "Produto atualizado com sucesso!" 
            });
        }).catch(err => {
            res.status(400).send({ 
                message: "Falha ao atualizar produto!", 
                data: err.message
            });
        });
};

exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.params.id)
        .then(data =>{
            res.status(200).send({ 
                message: "Produto deletado com sucesso!"
            });
        }).catch(err => {
            res.status(400).send({ 
                message: "Falha ao deletar produto!", 
                data: err.message
            });
        });
};