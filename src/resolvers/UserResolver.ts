import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import crypto from 'crypto'
import { User } from '../models/User'

//query: buscar dados
//mutation: criar, alterar ou deletar

@Resolver()
export class UserResolver {
  private data: User[] = []

  @Query()
  async users() {
    return this.data
  }

  @Mutation()
  async createUser(@Arg('name') name: string) {
    const user = { id: crypto.randomUUID(), name }

    this.data.push(user)

    return user
  }
}
