import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Leader from '@/models/Leader';
import { withAuth } from '@/middleware/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const leader = await Leader.findById(params.id);
    
    if (!leader) {
      return NextResponse.json(
        { error: 'Leader not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(leader);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch leader' },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    
    const { name, position, department, year, bio, email, image, imagePublicId, isExecutive } = await request.json();

    const leader = await Leader.findByIdAndUpdate(
      params.id,
      { name, position, department, year, bio, email, image, imagePublicId, isExecutive },
      { new: true }
    );

    if (!leader) {
      return NextResponse.json(
        { error: 'Leader not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(leader);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update leader' },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    
    const leader = await Leader.findById(params.id);

    if (!leader) {
      return NextResponse.json(
        { error: 'Leader not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    await deleteFromCloudinary(leader.imagePublicId);

    // Delete leader from database
    await Leader.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Leader deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete leader' },
      { status: 500 }
    );
  }
});