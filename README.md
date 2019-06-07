# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## users テーブル
|Column    |Type|Options|
|----------|-------|-----------------------------|
|id        |integer|null: false,foreign_key: true|
|nickname  |string |null: false,unique:true      |
|mail      |string |null: false,unique:true      |
|password  |integer|null: false                  |
### Association
- has_many :groups,through :members
- has_many :members
- has_many :messages

## groups テーブル
|Column|Type   |Options                    |
|------|-------|---------------------------|
|id    |integer|null:false,foreign_key:true|
|name  |string |null:false                 |
## Association
- has_many :users,through :members
- has_many :members
- has_many :messages

## messages テーブル
|Column  |Type   |Options                     |
|--------|-------|----------------------------|
|id      |integer|null: false                 |
|text    |text   |null: true                  |
|image   |string |null: true                  |
|group_id|integer|null:false ,foreign_key:true|
|user_id |integer|null:false ,foreign_key:true|
## Association
- belongs_to :user
- belongs_to :group

## members 中間テーブル
|Column |Type|Options                            |
|--------|-------|-------------------------------|
|user_id |integer|null: false, foreign_key: true |
|group_id|integer|null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user

<!-- 終了 -->
