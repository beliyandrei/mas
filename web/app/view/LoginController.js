/*
 * Copyright 2015 Anton Tananaev (anton.tananaev@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Ext.define('Traccar.view.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    languageSelected: false,
    requires: [
        'Traccar.view.Register'
    ],

    init: function () {
        Locale.language = 'es';
        this.lookupReference('registerButton').setDisabled(
            !Traccar.app.getServer().get('registration'));
        this.lookupReference('languageField').setValue('Español');
        
    },

    login: function () {
        var form = this.lookupReference('form');
        if (form.isValid()) {
            Ext.getBody().mask(Strings.sharedLoading);
            Ext.Ajax.request({
                scope: this,
                method: 'POST',
                url: '/api/session',
                params: form.getValues(),
                callback: function (options, success, response) {
                    Ext.getBody().unmask();
                    if (success) {
                        Traccar.app.setUser(Ext.decode(response.responseText));
                        this.fireViewEvent('login');
                    } else {
                        Traccar.app.showError(Strings.loginFailed);
                    }
                }
            });
        }
    },

    logout: function () {
        Ext.Ajax.request({
            scope: this,
            method: 'DELETE',
            url: '/api/session',
            callback: function () {
                window.location.reload();
            }
        });
    },


    onAfterRender: function (field) {
        field.focus();
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.login();
        }
    },

    onLoginClick: function () {
        Ext.getElementById('submitButton').click();
        this.login();
    },

    onRegisterClick: function () {
        Ext.create('Traccar.view.Register').show();
    }
});
